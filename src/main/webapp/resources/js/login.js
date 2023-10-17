$(function() {
  login.init();
});

let login = {
  init: function () {
    let _this = this;

    /* id 입력창 */
    $("#id").on('keydown', function (e) {

        /* 아이디를 입력한 경우 enter icon 표시 */
        if ($("#id").val().length + 1 > 0) {
            $("#idIcon").attr('style', 'display: show');
        }

        /* 아이디에 값이 있는 경우 */
        if ($("#id").val() != "") {
            $("#idIcon").attr('style', 'display: show');
        }

        /* 아이디를 입력하지 않고 엔터를 누른 경우 */
        if (e.keyCode === 13 && $("#id").val().length == 0) {
            swal({
                title: "아이디를 입력하세요.",
            });
            return false;
        }

        /* 아이디를 입력하고 엔터를 누른 경우 */
        if (e.keyCode === 13 && $("#id").val().length > 0) {
            $("#password").attr('style', 'display: block');
            $("#idIcon").attr('style', 'display: none');
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

        /* 비밀번호를 입력하지 않고 엔터를 누른 경우 */
        if (e.keyCode === 13 && $("#password").val().length == 0) {
            swal({
                title: "비밀번호를 입력하세요."
            });
            return false;
        }

        /* 비밀번호를 입력한 경우 */
        if ( $("#password").val().length + 1 > 0) {
            $("#idIcon").attr('style', 'display: none');
            $("#passwordIcon").attr('style', 'display: show');
        }

        /* 비밀번호를 입력하고 엔터를 누른 경우 */
        if (e.keyCode === 13 && $("#password").val().length + 1 > 0) {
            alert($("#id").val() + $("#password").val());
            // 로그인 API 호출
        }
    })
   }
}
