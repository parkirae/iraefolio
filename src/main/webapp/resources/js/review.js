$(function() {
  review.init();
});

let review = {

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

    /* 페이지네이션 초기화하는 함수 */
    this.pagination = new tui.Pagination(document.getElementById('pagination'),    {
      visiblePages: 5, // 한 번에 보여줄 1,2,3,4 목차 개수
      totalItems : this.cnt, // 전체 아이템 개수가 몇 개인지
      itemsPerPage: this.limit, // 한 페이지에 몇 개씩 보여줄 것인지
      centerAlign: true // 현재 선택된 페이지 중앙 정렬
    });

    /* 초기 데이터 읽어오는 함수 */
    let list = this.read();

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

    const searchEl = $(".search");
    const searchInputEl = searchEl.find("input");

    searchEl.on("click", function() {
      searchInputEl.focus();
    });

    searchInputEl.on("focus", function() {
      searchEl.addClass("focused");
      searchInputEl.attr("placeholder", "검색할 내용을 입력하세요!");
    });

    searchInputEl.on("blur", function() {
      searchEl.removeClass("focused");
      searchInputEl.attr("placeholder", "");
    });
  },

  /* READ */
  read: function() {
    let data;

    $.ajax({
      type:"POST",
      url:"/review",
      async: false,
      data: JSON.stringify({
        page: this.currentPage, // 현재 페이지
        limit: this.limit // 한번에 몇 개의 데이터를 보여줄 것인지
      }),
      contentType:"application/json; charset=utf-8",
      success: function(response){
        data = response;
      },
      error: function() {
      }
    });
    return data;
  },

  /* 데이터 개수 세는 함수 */
  readCnt: function () {
    let cnt;

    $.ajax({
      type: "POST",
      url: "/review/cnt",
      async: false,
      contentType:"application/json; charset=utf-8",
      success: function(response){
        cnt = response;
      },
      error: function() {
      }
    });
    return cnt;
  }
}
