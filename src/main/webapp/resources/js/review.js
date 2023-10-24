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

    $(".btn-delete").attr('onClick', "review.delete()");
    $(".btn-save").attr('onClick', "review.save()");

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
          name: "review_id",
          align: "center",
        },
        {
          header: "글쓴이",
          name: "writer",
          align: "center",
        },
        {
          header: "제목",
          name: "title",
          align: "center",
        },
        {
          header: "내용",
          name: "content",
          align: "center",
          resizable: true,
          editor: 'text',
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
      $("#title").val('');
      editor.setHTML('');
      $("#title").focus();
    })

    $("#close").click(function() {
      $("dialog").hide();
    });

    /* 모달 내 wysiwyg */
    let editor = new toastui.Editor({
      el: document.querySelector('#content'),
      initialEditType: 'wysiwyg',
    });
    _this.editor = editor;

    /* 등록 버튼 클릭 */
    $("#create").click(function () {

      /* 제목 입력 안 했을 경우 */
      if ($("#title").val() == "") {
        swal({
          title: "제목을 입력하세요.",
          type: 'warning'
        });
        $("#title").focus();
        return false;
      }

      /* 내용 입력 안 했을 경우 */
      if (editor.getHTML() == "<p><br></p>") {
        swal({
          title: "내용을 입력하세요.",
          type: 'warning'
        });
        $(".ProseMirror toastui-editor-contents").focus();
        return false;
      }

      let data = {};
      data.title = $("#title").val();
      data.content = editor.getHTML();
      _this.create(data);
    })

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
          _this.pagination.setTotalItems(_this.cnt);
        }
      }
    });


    /* 게시글 상세보기 */
    this.grid.on('click', (ev) => {
      let _this = this;
      let selectedColumn = ev.columnName;

      /* 내용을 선택하는 경우에만 수행 */
      if (selectedColumn != "content") return;

      /* Column을 클릭했을 때만 수행 */
      let focuesCell = this.grid.getFocusedCell();

      if (focuesCell) {

        let review_id = _this.grid.getRow(ev.rowKey).review_id;
        this.readOne(review_id);
      }
    });
  },

  /* CRUD 함수들 */
  /* CREATE */
  create: function (data) {
    let _this = this;

    data = data;

    $.ajax({
      type: "PUT",
      url: "/review",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        title: data.title,
        content: data.content
      }),
      success: function(response) {
        $("dialog").hide();
        _this.read();
      },
      error: function () {

      }
    })
  },

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
        _this.grid.resetData(data);
        // _this.pagination.setTotalItems(response.length);
      },
      error: function(response) {
        console.log(response);
        swal({
          title: response.responseText,
          type: 'warning'
        })
      }
    });
    return data;
  },

  /* READONE */
  readOne: function(review_id) {
    let _this = this;

    $.ajax({
      type:"GET",
      url:"/review/reviewDetail?review_id=" + review_id,
      async: false,
      contentType:"application/json; charset=utf-8",
      success: function(response){
        window.location.href = this.url;
      },
      error: function(response) {
        swal({
          title: response.responseText,
          type: 'warning'
        })
      }
    });
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

    console.log(data);

    /* 수정된 데이터에 updated flag 붙이기 */
    for (let i = 0; i < data.updatedRows.length; i++) {
      data.updatedRows[i].updated = true;
    }

    let arr = [];
    arr = data.updatedRows;

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
