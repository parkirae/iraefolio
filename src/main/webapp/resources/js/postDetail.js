$(function() {
    postDetail.init();
});

let postDetail = {
    init: function () {
        let _this = this;

        /* 업데이트 일자 보기 */
        $("#showUpdate").on("click", function(){
            $("#update_dt").toggle();
        });

        /* 로그인 상태가 아니라면 */
        $("#isNotLoggedIn").on('click', function() {
            if (confirm("로그인 후 이용해주세요,.")) {
                window.location.href = '/login';
            }
        })

        /* 로그인 상태라면 */
        $("#isLoggedIn")
            .on('focus', function () {
                $(this).animate({ height: '120px' }, 300);
            })
            .on('blur', function () {
                $(this).animate({ height: '60px' }, 300);
            });

        /* 댓글 햄버거 메뉴 클릭 */
        $('.commentMenu').on('click', function() {
            let commentId = $(this).find('.commentId').val();
            let commentUsername = $(this).find('.commentUsername').val();

            /* 자신이 작성한 댓글이라면 */
            if (commentUsername == user.username) {
                // 수정, 삭제 노출하기


                // 수정 선택 시 input으로 변경

            } else {
                alert("자신의 댓글만 수정할 수 있습니다.");
            }
        });

        /* 댓글 등록 */
        $("#commentSubmit").on('click', function () {

            let data = {};
            data.username = user.username;
            data.member_id = user.memberId;
            data.content = $("#isLoggedIn").val();
            data.post_id = $("#postID").val();
            data.writer = $("#writer").text();
            _this.create(data);
        })
    },

    /* CRUD 함수들 */
    /* CREATE */
    create: function (data) {
        let _this = this;

        $.ajax({
            type: "POST",
            url: "/header",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                username: data.username,
                member_id: data.member_id,
                content: data.content,
                post_id: data.post_id,
                writer: data.writer
            }),
            success: function() {
                _this.read();
            },
            error: function (xhr, status, error) {
            }
        })
    },

    read: function () {
        let _this = this;

        $.ajax({
            type: "PUT",
            url: "/header",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                postId: $("#postID").val()
            }),
            success: function() {

            },
            error: function (xhr, status, error) {
            }
        })
    }

}
