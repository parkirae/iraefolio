$(function() {
    postDetail.init();
});

let postDetail = {
    init: function () {
        let _this = this;
        $("#showUpdate").on("click", function(){
            $("#update_dt").toggle();
        });
    },

}
