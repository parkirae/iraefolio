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
      scrollY: true,
      bodyHeight: 300,
      data: [],
      columns: [
        {
          header: "게시글 번호",
          name: "seq",
          align: "center",
          resizable: true,
        },
        {
          header: "글쓴이",
          name: "writer",
          align: "center",
          resizable: true,
        },
        {
          header: "내용",
          name: "content",
          align: "center",
          resizable: true,
        },
        {
          header: "작성일자",
          name: "create_dt",
          align: "center",
          resizable: true,
        },
        {
          header: "수정일자",
          name: "update_dt",
          align: "center",
          resizable: true,
        },
      ],
    });

    let list = this.read();

    if (list) {
      this.grid.resetData(list);
    }
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
