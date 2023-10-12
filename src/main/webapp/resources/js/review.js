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

    /* 검색창 관련 함수 */
    const searchEl = $(".search");
    const searchInputEl = searchEl.find("input");

    searchEl.on("click", function() {
      searchInputEl.focus();
      searchInputEl.val('');
    });

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


    // this.grid.on('click', (ev) => {
    //   let _this = this;
    //
    //   // 내용을 선택하는 경우에만 수행
    //   if (ev.columnName != "content") return;
    //
    //   // Column을 클릭했을 때만 수행
    //   let focuesCell = this.grid.getFocusedCell();
    //
    //   if (focuesCell) {
    //     let modifiedContent = _this.grid.getRow(ev.rowKey).content;
    //
    //     let seq = _this.grid.getRow(ev.rowKey).seq;
    //     console.log(modifiedContent)
    //     console.log(seq);
    //   }
    // });
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
  }
}
