$(function() {
  review.init();
});

let review = {

  seq: null,
  pagination : null,
  cnt : null,
  limit : 11,
  currentPage: 1,

  init: function () {
    let _this = this;

    let Grid = tui.Grid;
    Grid.applyTheme('clean');

    this.grid = new Grid({
      el: document.getElementById('grid'),
      scrollX: false,
      scrollY: false,
      bodyHeight: 450,
      rowHeaders: ['checkbox'],
      columns: [
        {
          header: "게시글 번호",
          name: "seq",
          align: "center",
        },
        {
          header: "글쓴이",
          name: "writer",
          align: "center",
        },
        {
          header: "내용",
          name: "content",
          align: "center",
          resizable: true,
          editor: 'text'
        },
        {
          header: "작성일자",
          name: "create_dt",
          align: "center",
        },
        {
          header: "수정일자",
          name: "update_dt",
          align: "center",
        },
      ],
    });

    /* 데이터 총 개수 세는 함수 */
    this.cnt = this.readCnt();

    /* 초기 데이터 읽어오는 함수 */
    let list = this.read();

    /* 페이지네이션 초기화하는 함수 */
    this.pagination = new tui.Pagination(document.getElementById('pagination'),    {
      visiblePages: 5, // 한 번에 보여줄 1,2,3,4 목차 개수
      totalItems : this.cnt, // 전체 아이템 개수가 몇 개인지
      itemsPerPage: this.limit, // 한 페이지에 몇 개씩 보여줄 것인지
      centerAlign: true // 현재 선택된 페이지 중앙 정렬
    });


    /* 읽어온 데이터 그리드에 그리는 함수 */
    if (list) {
      this.grid.resetData(list);
      this.pagination.setTotalItems(this.cnt);
    }

    /* 페이지 이동 시 실행되는 함수 */
    this.pagination.on('afterMove', function (ev) {
      _this.currentPage = ev.page;
      let list = _this.read();
      if (list) {
        _this.grid.resetData(list);
        _this.pagination.setTotalItems(_this.cnt);
      }
    });

    /* 모달 관련 함수 */
    $(".btn-create").click(function () {
      $("dialog").show();
      $("dialog").attr('style', 'display: block');
    })

    // 버튼을 클릭했을 때 어떤 작업을 수행하려면 이벤트 핸들러를 추가할 수 있습니다.
    $("#Close").click(function() {
      $("dialog").hide();
    });

    /* 모달 내 wysiwyg */
    let editor = new toastui.Editor({
      el: document.querySelector('#content'),
      initialEditType: 'wysiwyg',
    });
    _this.editor = editor;

    /* 검색창 관련 함수 */
    const searchEl = $(".search");
    const searchInputEl = searchEl.find("input");

    searchEl.click(function () {
      searchInputEl.focus();
      searchInputEl.val('');
    })

    searchInputEl.on("focus", function() {
      searchEl.addClass("focused");
      searchInputEl.attr("placeholder", "검색할 내용을 입력하세요.");
    });

    searchInputEl.on("blur", function() {
      searchEl.removeClass("focused");
      // searchInputEl.val('');
      searchInputEl.attr("placeholder", "");
    });

    /* 검색창 enterkey 이벤트 */
    $(".search_input").on("keydown", function(e){
      if(e.keyCode === 13) {
        let list = _this.read();
        if (list) {
          _this.grid.resetData(list);
          _this.cnt = _this.readCnt();
          console.log(_this.cnt);
          // this.cnt = list.length; // 이건 확실히 아님
          // console.log(this.cnt); // 이건 확실히 아님
          _this.pagination.setTotalItems(_this.cnt);
        }
      }
    });


    this.grid.on('click', (ev) => {
      let _this = this;

      // 내용을 선택하는 경우에만 수행
      if (ev.columnName != "content") return;

      // Column을 클릭했을 때만 수행
      let focuesCell = this.grid.getFocusedCell();

      if (focuesCell) {
        let modifiedContent = _this.grid.getRow(ev.rowKey).content;

        let seq = _this.grid.getRow(ev.rowKey).seq;
      }
    });
  },

  /* CRUD 함수들 */
  /* READ */
  read: function() {
    let _this = this;
    let data;

    $.ajax({
      type:"POST",
      url:"/review",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        page: this.currentPage, // 현재 페이지
        limit: this.limit, // 한번에 몇 개의 데이터를 보여줄 것인지
        content: $(".search_input").val(),
      }),
      success: function(response){
        data = response;
        // _this.pagination.setTotalItems(response.length);
      },
      error: function() {
      }
    });
    return data;
  },

  /* 삭제 */
  delete: function() {
    let checkRows = [];
    checkRows = this.grid.getCheckedRowKeys();

    this.grid.uncheckAll();

    for(let i = 0; i < checkRows.length ; i++){
      this.grid.setRow(checkRows[i], $.extend({}, this.grid.getRow(checkRows[i]), {deleted: true}));
      this.grid.disableRow(checkRows[i], true);
    }
  },

  /* 저장 */
  save: function() {
    let _this = this;

    /* grid 블러 처리 */
    this.grid.blur();

    /* 수정된 그리드 정보 변수에 담기 */
    let data = this.grid.getModifiedRows();

    /* 수정된 데이터에 updated flag 붙이기 */
    for (let i = 0; i < data.updatedRows.length; i++) {
      data.updatedRows[i].updated = true;
    }

    let arr = [];
    arr = data.updatedRows;

    console.log(arr);

    $.ajax({
      type: "PATCH",
      url: "/review",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(arr),
      success: function(response) {
        let list = _this.read();
        if (list) {
          _this.grid.resetData(list);
          _this.pagination.setTotalItems(_this.cnt);
        }
      },
      error: function () {
      }
    })
  },

  /* CRUD 도와주는 함수들 */
  /* 데이터 개수 세는 함수 */
  readCnt: function () {
    let _this = this;
    let cnt;

    $.ajax({
      type: "POST",
      url: "/review/cnt",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        content: $(".search_input").val(),
      }),
      success: function(response){
        cnt = response;
      },
      error: function() {
      }
    });
    return cnt;
  },
}
