const englishOnly = /^[a-zA-Z]*$/;

$(function() {
  signIn.init();
});

let signIn = {
    init: function () {
        let _this = this;

        $("#username").focus();

        $("#username").on('keydown', function (e) {
            $("#username").on('input', function (e) {
                let inputID = $(this).val().length;

                if (inputID > 0) {
                    $("#returnIcon").attr('style', 'show');
                } else {
                    $('#returnIcon').css('display', 'none');
                }
            });

            if (e.keyCode == 13 && $("#username").val().length == 0) {
                $('.boxWrapper .input-box p').text('아이디를 입력해주세요.');
                return false;
            }

            if (e.keyCode == 13 && $("#username").val().length != 0) {
                let USER_NAME = $("#username").val();
                let result;

                if (!englishOnly.test(USER_NAME)) {
                    $('.boxWrapper .input-box p').text('아이디는 영어 소문자만 사용할 수 있어요.');
                    return false;
                }

                if (USER_NAME.length < 4) {
                    $('.boxWrapper .input-box p').text('아이디는 최소 4글자 이상이여야 해요.');
                    return false;
                }

                result = _this.accountCheck(USER_NAME);

                if (result) {
                    $('.boxWrapper .input-box p').text('이미 사용 중인 아이디입니다.');
                    return false;
                } else {
                    $("#username").hide();
                    $('.boxWrapper .input-box p').text('비밀번호를 입력하고 엔터를 쳐보세요!');
                    $("#password").show();
                    $("#password").focus();
                    $('#returnIcon').css('display', 'none');
                }
            }
        });

        $("#password").on('keydown', function (e) {
            $("#password").on('input', function (e) {
                let inputPW = $(this).val().length;

                if (inputPW > 0) {
                    $("#returnIcon").attr('style', 'show');
                } else {
                    $('#returnIcon').css('display', 'none');
                }
            });

            if (e.keyCode == 13 && $("#password").val().length == 0) {
                $('.boxWrapper .input-box p').text('비밀번호를 입력해주세요.');
                return false;
            }

            if (e.keyCode == 13 && $("#password").val().length != 0) {
                let userPW = $("#password").val();

                if (userPW.length < 4) {
                    $('.boxWrapper .input-box p').text('비밀번호는 최소 4글자 이상이여야 해요.');
                    return false;
                }

                $("#password").hide();
                $("#secondPassword").show();
                $("#secondPassword").focus();
                $('.boxWrapper .input-box p').text('비밀번호를 한 번 더 입력해주세요.');
            }
        })

        $("#secondPassword").on('keydown', function (e) {
            $("#secondPassword").on('input', function (e) {
                let inputSecondPW = $(this).val().length;

                if (inputSecondPW > 0) {
                    $("#returnIcon").attr('style', 'show');
                } else {
                    $('#returnIcon').css('display', 'none');
                }
            });

            if (e.keyCode == 13 && $("#secondPassword").val().length == 0) {
                $('.boxWrapper .input-box p').text('비밀번호 한 번 더 입력해주세요.');
                return false;
            }

            if (e.keyCode == 13 && $("#secondPassword").val().length != 0) {
                userPW = $("#password").val();
                userSecondPW = $("#secondPassword").val();

                result = _this.passwordCheck(userPW, userSecondPW);

                if (!result) {
                    $('.boxWrapper .input-box p').text('비밀번호가 일치하지 않아요.');
                    return false;
                } else {
                    $("#secondPassword").hide();
                    $('.boxWrapper .input-box p').text('');
                    $('#returnIcon').css('display', 'none');
                    $("#name").show();
                    $("#name").focus();
                    $('.boxWrapper .input-box p').text('이제 마지막이에요 :)');
                }
            }
        })

        $("#name").on('keydown', function (e) {
            $("#name").on('input', function (e) {
                let inputUserName = $(this).val();

                if (inputUserName.length > 0) {
                    $("#returnIcon").attr('style', 'show');
                } else {
                    $('#returnIcon').css('display', 'none');
                }
            })

            if (e.keyCode == 13 && $("#name").val().length == 0) {
                $('.boxWrapper .input-box p').text('이름을 입력해주세요.');
                return false;
            }

            if (e.keyCode == 13 && $("#name").val().length != 0) {

                $.ajax({
                    type: "POST",
                    url: "/create",
                    data: JSON.stringify({
                       username: $("#username").val(),
                       password: $("#password").val(),
                       name: $("#name").val(),
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        window.location.href = "/";
                    },
                    error: function (response) {
                        window.location.href = "/";
                    }
                });

            }
        })

    },

    accountCheck: function (USER_NAME) {
        let result;

        $.ajax({
            type:"POST",
            url:"/accountCheck",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                username: USER_NAME
            }),
            success: function(response){
                result = response;
            },
            error: function(response) {
            }
        });
        return result;
    },

    passwordCheck: function (password, secondPassword) {
        let result;

        if (password == secondPassword) {
            result = 1;
        } else {
            result = 0;
        }
        return result;
    }
}
