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
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
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
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {

                let comment = [];
                let reComment = [];
                for (let i = 0; i < response.length; i++) {
                    if (response[i].type == 'comment') {
                        comment.push(response[i]);
                    } else {
                        reComment.push(response[i]);
                    }
                }
                _this.createElement(comment, reComment);
            },
            error: function (xhr, status, error) {
            }
        })
    },

    /* 댓글, 답글 element 생성 */
    createElement: function(comment, reComment) {
        let _this = this;

        /* 답글 개수 */
        const reCommentCounts = {};
        for (const reCommentItem of reComment) {
            const commentId = reCommentItem.comment_id;
            reCommentCounts[commentId] = (reCommentCounts[commentId] || 0) + 1;
        }


        for (let i = 0; i < comment.length; i++) {
            /* 답글 데이터 */
            let reCommentData = [];
            for (const reCommentItem of reComment) {
                if (comment[i].comment_id == reCommentItem.comment_id) {
                    reCommentData.push(reCommentItem);
                }
            }

            /* 댓글 작성자 */
            let commentWriterDiv = $('<div>', {
                id: 'commentWriter',
                text: comment[i].writer
            });

            /* 댓글 ID */
            let commentUsernameDiv = $('<p>', {
                id: 'commentUsername',
                text: `(${comment[i].username})`
            });

            /* 댓글 메뉴 */
            let buttonDiv = $('<button>', {
                class: 'commentMenu',
            });

            /* 댓글 메뉴 버튼 */
            let buttonImg = $('<img>', {
                src: '../../resources/images/common/kebab.png'
            });

            /* 댓글 comment_id */
            let commentIdInput = $('<input>', {
                type: 'hidden',
                id: 'commentId',
                value: comment[i].comment_id
            });

            /* 댓글 ID */
            let commentUsernameInput = $('<input>', {
                type: 'hidden',
                id: 'commentUsername',
                value: comment[i].username
            });

            /* 삭제 버튼 */
            let deleteDiv = $('<button>', {
                class: 'delete',
                text: '삭제'
            });

            /* 삭제 버튼에 정보 추가 */
            deleteDiv.append(commentIdInput.clone(), commentUsernameInput.clone());

            buttonDiv.append(buttonImg, deleteDiv);

            commentWriterDiv.append(commentUsernameDiv, buttonDiv);

            const parsedDate = moment(comment[i].create_dt);
            const formattedDate = parsedDate.format('YYYY년 MM월 DD일 HH:mm:ss');
            let commentCreateDTDiv = $('<div>', {
                id: 'commentCreateDT',
                text: formattedDate
            });

            let commentContentDiv = $('<div>', {
                id: 'commentContent',
                text: comment[i].content
            });

            let reCommentCount = reCommentCounts[comment[i].comment_id] || 0;
            let reCommentBtnDiv = $('<button>', {
                class: 'reComment',
                text: `답글 ${reCommentCount}개`
            });

            let reCommentBtnImg = $('<img>', {
                src: '../../resources/images/common/arrow.png'
            })

            reCommentBtnDiv.append(reCommentBtnImg);

            /* 답글 input, btn 박스 */
            let reCommentBoxDiv = $('<div>', {
                class: 'reComment-box-comment'
            })

            /* 답글 input */
            let reCommentIsLoggedIn = $('<input>', {
                class: 'reCommentIsLoggedIn',
                type: 'text',
                placeholder: '답글을 입력하세요'
            })

            /* 답글 버튼 박스 */
            let reCommentBoxBtn = $('<div>', {
                class: 'reComment-box-btn'
            })

            /* 답글 취소 버튼 */
            let reCommentCancel = $('<button>', {
                class: 'reCommentCancel',
                text: '취소'
            })

            /* 답글 등록 버튼 */
            let reCommentSubmit = $('<button>', {
                class: 'reCommentSubmit',
                text: '등록'
            })

            reCommentBoxBtn.append(reCommentCancel, reCommentSubmit, commentIdInput, commentUsernameInput);
            reCommentBoxDiv.append(reCommentIsLoggedIn, reCommentBoxBtn);

            $('.comment-box-comment').append(commentWriterDiv, commentCreateDTDiv, commentContentDiv, reCommentBtnDiv, reCommentBoxDiv);

            // 대댓글 UI 생성
            for (const reCommentItem of reCommentData) {

                let reCommentBoxComment = $('<div>', {
                    class: 'reComment-box-comment'
                })

                let reCommentBoxDiv = $('<div>', {
                    class: 'reCommentBox'
                });

                let reCommentWriter = $('<div>', {
                    class: 'reCommentWriter',
                    text: reCommentItem.writer
                });

                let reCommentUsername = $('<div>', {
                    class: 'reCommentUsername',
                    text: `(${reCommentItem.username})`
                });

                const parseDate = moment(reCommentItem.create_dt);
                const formatDate = parseDate.format('YYYY년 MM월 DD일 HH:mm:ss');
                let reCommentCreateDt = $('<div>', {
                    class: 'reCommentCreateDT',
                    text: formatDate
                });

                let reCommentMenuBtnDiv = $('<button>', {
                    class: 'reCommentMenu',
                });

                let reCommentMenuBtnImg = $('<img>', {
                    src: '../../resources/images/common/kebab.png'
                });

                let reCommentIdInput = $('<input>', {
                    type: 'hidden',
                    id: 'reCommentId',
                    value: reCommentItem.recomment_id
                });

                let reCommentUsernameInput = $('<input>', {
                    type: 'hidden',
                    id: 'reCommentUsername',
                    value: reCommentItem.username
                });

                let deleteDiv = $('<button>', {
                    class: 'reCommentDelete',
                    text: '삭제'
                });

                deleteDiv.append(reCommentIdInput, reCommentUsernameInput);

                reCommentMenuBtnDiv.append(reCommentMenuBtnImg, deleteDiv);
                reCommentWriter.append(reCommentUsername, reCommentMenuBtnDiv);

                let reCommentContent = $('<div>', {
                    class: 'reCommentContent',
                    text: reCommentItem.content
                });

                $('.comment-box-comment').append(reCommentBoxComment);

                reCommentBoxDiv.append(reCommentWriter, reCommentCreateDt, reCommentContent);
                reCommentBoxComment.append(reCommentBoxDiv);
            }
        }

        /* 답글 이벤트 */
        $(".reComment").on('click', function () {
            $(this).nextUntil(".reComment").filter(".reComment-box-comment").toggle();
            $(".reCommentIsLoggedIn").val('');
        })

        /* 각종 이벤트 */
        /* 답글 입력창 이벤트 */
        $('.reCommentIsLoggedIn').focus(function () {
            $(this).css('border-bottom', '2px solid black');
        });

        $('.reCommentIsLoggedIn').blur(function () {
            $(this).css('border-bottom', '');
        });

        /* 답글 등록 */
        $(".reCommentSubmit").on('click', function () {
            let inputValue = $(this).closest(".reComment-box-comment").find(".reCommentIsLoggedIn").val();
            if (inputValue == '') return false;

            let data = {};
            data.username = user.username;
            data.name = user.name;
            data.memberID = user.memberId;
            data.commentID = $(this).parent().find('#commentId').val();
            data.postID = $("#postID").val();
            data.category = $("#postCategory").val();
            data.content = inputValue;

            _this.createReComment(data);
        })

        /* 댓글 이벤트 */
        $(".commentMenu").hover(function () {
            $(this).find(".delete").show();
        }, function () {
            $(this).find(".delete").hide();
        });

        /* 답글 이벤트 */
        $(".reCommentMenu").hover(function () {
            $(this).find(".reCommentDelete").show();
        }, function () {
            $(this).find(".reCommentDelete").hide();
        });

        /* 댓글 삭제 */
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

        $(".reCommentDelete").on('click', function () {
            let reCommentId = $(this).find("#reCommentId").val();
            let reCommentUsername = $(this).find("#reCommentUsername").val();

            // 삭제할 수 있는지 체크하고, 삭제 로직
            if (user.username === "") {
                if (confirm("로그인 후 이용해주세요.")) {
                    location.href = '/login';
                }
                return false;
            }

            if (user.username != reCommentUsername) {
                alert("자신이 작성한 답글만 삭제할 수 있습니다.");
                return false;
            }

            _this.reCommentDelete(reCommentId);
        })
    },

    delete: function (commentId) {
        let _this = this;

        $.ajax({
            type: "DELETE",
            url: "/header",
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                comment_id: commentId
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                $('.comment-box-comment').empty();
                _this.read();
            },
            error: function (xhr, status, error) {
                alert("error")
            }
        })
    },

    createReComment: function (data) {
        let _this = this;

        console.log(data);
        $.ajax({
            type: "POST",
            url: "/header/create",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                username: data.username,
                writer: data.name,
                member_id: data.memberID,
                post_id: data.postID,
                category: data.category,
                comment_id: data.commentID,
                content: data.content,
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                $('.reCommentIsLoggedIn').empty();
                $('.comment-box-comment').empty();
                $('.reComment-box-comment').empty();
                $(".reCommentBox").empty();
                _this.read();
            },
            error: function (xhr, status, error) {
                alert("error")
            }
        })
    },

    reCommentDelete: function (reCommentId) {
        let _this = this;

        $.ajax({
            type: "DELETE",
            url: "/header/delete",
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                recomment_id: reCommentId
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                $('.comment-box-comment').empty();
                _this.read();
            },
            error: function (xhr, status, error) {
                alert("error")
            }
        })
    },
}
