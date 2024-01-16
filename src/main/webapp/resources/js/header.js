
$(function() {
  header.init();
});

let header = {
    init: function () {
        let _this = this;

        /* 관리자 계정인 경우 계정 관리 show */
        if (user.role === "ROLE_ADMIN" || user.role === "ROLE_SUPER") {
            $("#isAdmin").append('<li><a href="/account">계정 관리</a></li>');
            $("#isAdmin").append('<li><a href="/post">게시글 관리</a></li>');
        } else {
            $("#isAdmin").append('<li></li>');
        }
    },

    read: function () {

    }
}
