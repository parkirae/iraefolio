$(function () {
    index.init();
});

let index = {
    init: function () {
        let _this = this;

        $(".main-header").animate(700, function () {
            $(this).slideDown(700);
        });

        $('.logout').click(function (e) {
            e.preventDefault();

            let csrfToken = $("input[name='_csrf']").val();
            let form = $('<form/>', {
                action: '/logout',
                method: 'post',
                text: 'logout'
            });

            let csrfInput = $('<input/>', {
                type: 'hidden',
                name: '_csrf',
                value: csrfToken
            });

            form.append(csrfInput);
            form.appendTo('body').submit();
        });
    },
}
