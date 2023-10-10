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
          name: "SEQ",
          align: "center",
          resizable: true,
        },
        {
          header: "글쓴이",
          name: "WRITER",
          align: "center",
          resizable: true,
        },
        {
          header: "내용",
          name: "CONTENT",
          align: "center",
          resizable: true,
        },
        {
          header: "작성일자",
          name: "CREATE_DT",
          align: "center",
          resizable: true,
        },
        {
          header: "수정일자",
          name: "UPDATE_DT",
          align: "center",
          resizable: true,
        },
      ],
    });

    // let list = this.read();

    if (list) {
      this.grid.resetData(list);
    }
  },

  read: function() {
    let _this = this;

    $.ajax({
      type:"GET",
      url:"/review/list",
      success: function(data){
        alert("성공");
        console.log(data);
      },
      error: function() {
        alert("실패");
      }
    });
  }
}
