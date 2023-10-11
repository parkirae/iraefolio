$(function() {
  review.init();
});

let review = {

  init: function () {

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

    let list = this.read();

    if (list) {
      this.grid.resetData(list);
    }

    var pagination = new tui.Pagination(document.getElementById('pagination'), {
      totalItems: 30,
      itemsPerPage: 14,
      visiblePages: 5,
      centerAlign: true
    });
  },

  read: function() {
    let _this = this;
    let data;

    $.ajax({
      type:"POST",
      url:"/review",
      async: false,
      contentType:"application/json; charset=utf-8",
      success: function(response){
        data = response;
      },
      error: function() {
      }
    });
    return data;
  }
}
