$(function() {
    postDetail.init();
});

let postDetail = {
    init: function () {
        let _this = this;

        _this.read();

        /* 업데이트 일자 보기 */
        $("#showUpdate").on("click", function(){
            $("#update_dt").toggle();
        });

        /* 로그인 상태가 아니라면 */
        $("#isNotLoggedIn").on('click', function() {
            if (confirm("로그인 후 이용해주세요.")) {
                location.href = '/login';
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

        /* 댓글 등록 */
        $("#commentSubmit").on('click', function () {

            if ($("#isLoggedIn").val() == '')  return false;

            let data = {};
            data.username = user.username;
            data.member_id = user.memberId;
            data.content = $("#isLoggedIn").val();
            data.post_id = $("#postID").val();
            data.writer = $("#writer").text();
            data.category = $("#postCategory").val();
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
                writer: data.writer,
                category: data.category
            }),
            success: function() {
                $('.comment-box-comment').empty();
                _this.read();
                $("#isLoggedIn").val('');
            },
            error: function (xhr, status, error) {
            }
        })
    },

    /* READ */
    read: function () {
        let _this = this;

        $.ajax({
            type: "PUT",
            url: "/header",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                post_id: $("#postID").val(),
                category: $("#postCategory").val()
            }),
            success: function(response) {
                _this.createElement(response);
            },
            error: function (xhr, status, error) {
            }
        })
    },

    createElement: function(data) {
        let _this = this;

        for (let i = 0; i < data.length; i++) {

            let commentWriterDiv = $('<div>', {
                id: 'commentWriter',
                text: data[i].writer
            })
            let commentUsernameDiv = $('<p>', {
                id: 'commentUsername',
                text: `(` + data[i].username + `)`
            })

            let buttonDiv =  $('<button>', {
                class: 'commentMenu',
            })

            let buttonImg =  $('<img>', {
                src: '../../resources/images/common/kebab.png'
            })

            let commentIdInput = $('<input>', {
                type: 'hidden',
                id: 'commentId',
                value: data[i].comment_id
            })

            let commentUsernameInput = $('<input>', {
                type: 'hidden',
                id: 'commentUsername',
                value: data[i].username
            })

            let deleteDiv = $('<button>', {
                class: 'delete',
                text: '삭제'
            })

            deleteDiv.append(commentIdInput.clone(), commentUsernameInput.clone());

            buttonDiv.append(buttonImg, deleteDiv);

            commentWriterDiv.append(commentUsernameDiv, buttonDiv);

            // moment.js를 사용하여 파싱
            const parsedDate = moment(data[i].create_dt);
            const formattedDate = parsedDate.format('YYYY년 MM월 DD일 HH:mm:ss');

            let commentCreateDTDiv = $('<div>', {
                id: 'commentCreateDT',
                text: formattedDate
            })

            let commentContentDiv = $('<div>', {
                id: 'commentContent',
                text: data[i].content
            })

            $('.comment-box-comment').append(commentWriterDiv, commentCreateDTDiv, commentContentDiv, '<br />');

            $(".commentMenu").hover(function () {
                $(this).find(".delete").show();
            }, function () {
                $(this).find(".delete").hide();
            });

            $(".delete").on('click', function () {
                let commentId = $(this).find('#commentId').val();
                let commentUsername = $(this).find('#commentUsername').val();

                // 삭제할 수 있는지 체크하고, 삭제 로직
                if (user.username === "") {
                    if (confirm("로그인 후 이용해주세요.")) {
                        location.href = '/login';
                    }
                    return false;
                }

                if (user.username != commentUsername) {
                    alert("자신이 작성한 댓글만 삭제할 수 있습니다.");
                    return false;
                }

                _this.delete(commentId);
            })
        }
    },

    delete: function (commentId) {
        let _this = this;

        $.ajax({
            type: "DELETE",
            url: "/header",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                comment_id: commentId
            }),
            success: function(response) {
                $('.comment-box-comment').empty();
                _this.read();
            },
            error: function (xhr, status, error) {
                alert("error")
            }
        })
    }
}
