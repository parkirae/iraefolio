$(function() {
  login.init();
});

let login = {
  init: function () {
    let _this = this;

    $("#id").focus();
    $("#signUp").attr('style', 'display: show');

    /* 크롬 비밀번호 자동 완성 관련 */
    if ($("#id").val() != "") {
        $("#idIcon").attr('style', 'display: none');
        $("#password").attr('style', 'display: show !important');
        $("#passwordIcon").attr('style', 'display: none');
    }

    /* id 입력창 */
    $("#id").on('keydown', function (e) {
        $("#id").on('input', function (e) {
            let input = $(this).val().length;

            if (input > 0) {
                $("#idIcon").attr('style', 'display: show');
                $("#signUp").attr('style', 'display: none');
                $("#idInformation").attr('style', 'display: show');
                $("#loginFailMsg").attr('style', 'display: none');
            } else {
                $("#signUp").attr('style', 'display: show');
                $("#idInformation").attr('style', 'display: none');
            }
        })

        /* 아이디를 입력하지 않고 엔터를 누른 경우 */
        if (e.keyCode === 13 && $("#id").val().length == 0) {
            swal({
                title: "아이디를 입력하세요.",
            });
            return false;
        }

        /* 아이디를 입력하고 엔터를 누른 경우 */
        if (e.keyCode === 9 || e.keyCode === 13 && $("#id").val().length > 0) {
            $("#password").attr('style', 'display: show');
            $("#idIcon").attr('style', 'display: none');
            $("#idInformation").attr('style', 'display: none');
            $("#password").focus();
        }
    })

      /* 아이디의 값을 모두 지운 경우 */
      $("#id").on("input", function() {
          if ($(this).val().length == 0) {
              $("#idIcon").attr('style', 'display: none');
              $("#passwordIcon").attr('style', 'display: none');
              $("#password").attr('style', 'display: none');
              $("#password").val('');
          }
      });

      /* 패스워드의 값을 모두 지운 경우 */
      $("#password").on("input", function() {
          if ($(this).val().length == 0) {
              $("#id").focus();
              $("#passwordIcon").attr('style', 'display: none');
              $("#password").attr('style', 'display: none');
              $("#password").val('');
          }
      });

    /* password 입력창 */
    $("#password").on('keydown', function (e) {
        $("#password").on('input', function (e) {
            let input = $(this).val().length;

            if (input > 0) {
                $("#idIcon").attr('style', 'display: none');
                $("#passwordIcon").attr('style', 'display: show');
                $("#pwInformation").attr('style', 'display: show');
            } else {
                $("#idIcon").attr('style', 'display: show');
                $("#passwordIcon").attr('style', 'display: none');
                $("#pwInformation").attr('style', 'display: none');
            }
        })

        if (e.keyCode === 13 && $("#password").val().length == 0) {
            swal({
                title: "비밀번호를 입력하세요.",
                type: 'warning'
            });
            return false;
        }

        if (e.keyCode === 13 && $("#password").val().length > 0) {

            $("#submitBtn").prop('disabled', false);
            
        }
    })
   },
}
