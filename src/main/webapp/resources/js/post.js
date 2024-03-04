/*
객체 user는 로그인한 유저 정보를 담고 있음.
header.jsp에 선언되어 있음.
 */

$(function() {
    post.init();
});

let post = {

    seq: null,
    pagination : null,
    cnt : null,
    limit : 11,
    currentPage: 1,

    init: function () {
        let _this = this;

        /* 버튼에 onClick 함수 할당 */
        $(".btn-delete").attr('onClick', "post.delete()");
        $(".btn-save").attr('onClick', "post.save()");

        /* 그리드 초기화 */
        let Grid = tui.Grid;
        Grid.applyTheme('clean');

        this.grid = new Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
            bodyHeight: 450,
            rowHeaders: ['checkbox'],
            columns: [
                {
                    header: "번호",
                    name: "post_id",
                    align: "center",
                },
                {
                    header: "작성자",
                    name: "writer",
                    align: "center",
                },
                {
                    header: "분류",
                    name: "category",
                    align: "center",
                    editor: {
                        type: 'select',
                        options: {
                            listItems: [
                                { text: 'JAVA', value: 'JAVA' },
                                { text: 'SpringBoot', value: 'SpringBoot' },
                                { text: 'SpringSecurity', value: 'SpringSecurity' },
                                { text: 'MyBatis', value: 'MyBatis' },
                                { text: 'MariaDB', value: 'MariaDB' },
                                { text: 'jQuery', value: 'jQuery' },
                                { text: 'JSP', value: 'JSP' }
                            ]
                        }
                    },
                },
                {
                    header: "제목",
                    name: "title",
                    align: "center",
                    editor: 'text'
                },
                {
                    header: "내용",
                    name: "content",
                    align: "center",
                    resizable: true,
                    editor: 'text',
                },
                {
                    header: "작성일",
                    name: "create_dt",
                    align: "center",
                },
                {
                    header: "수정일",
                    name: "update_dt",
                    align: "center",
                },
            ],
        });

        /* 데이터 총 개수 세는 함수 */
        this.cnt = this.readCnt();

        /* 초기 데이터 읽어오는 함수 */
        let list = this.read();

        /* 페이지네이션 초기화하는 함수 */
        this.pagination = new tui.Pagination(document.getElementById('pagination'),    {
            visiblePages: 5, // 한 번에 보여줄 1,2,3,4 목차 개수
            totalItems : this.cnt, // 전체 아이템 개수가 몇 개인지
            itemsPerPage: this.limit, // 한 페이지에 몇 개씩 보여줄 것인지
            centerAlign: true // 현재 선택된 페이지 중앙 정렬
        });


        /* 읽어온 데이터 그리드에 그리는 함수 */
        if (list) {
            this.grid.resetData(list);
            this.pagination.setTotalItems(this.cnt);
        }

        /* 페이지 이동 시 실행되는 함수 */
        this.pagination.on('afterMove', function (ev) {
            _this.currentPage = ev.page;
            let list = _this.read();
            if (list) {
                _this.grid.resetData(list);
                _this.pagination.setTotalItems(_this.cnt);
            }
        });

        /* 검색창 관련 함수 */
        const searchEl = $(".search");
        const searchInputEl = searchEl.find("input");

        searchEl.click(function () {
            searchInputEl.focus();
            searchInputEl.val('');
        })

        searchInputEl.on("focus", function() {
            searchEl.addClass("focused");
            searchInputEl.attr("placeholder", "검색할 내용을 입력하세요.");
        });

        searchInputEl.on("blur", function() {
            searchEl.removeClass("focused");
            searchInputEl.attr("placeholder", "");
            searchInputEl.val('');
        });

        /* 검색창 enterkey 이벤트 */
        $(".search_input").on("keydown", function(e){
            if(e.keyCode === 13) {
                let list = _this.read();
                if (list) {
                    _this.grid.resetData(list);
                    _this.cnt = _this.readCnt();
                    _this.pagination.setTotalItems(_this.cnt);
                }
            }
        });

        /* 모달 종료 관련 함수 */
        $("#close").click(function() {
            $("dialog").hide();
        });

        /* 모달 종료 관련 함수 */
        $("dialog").on('keydown', function (e) {
            if (e.keyCode === 27) $("dialog").hide();
        })

        /* 모달 내 wysiwyg */
        let editor = new toastui.Editor({
            el: document.querySelector('#content'),
            initialEditType: 'wysiwyg',
        });
        _this.editor = editor;

        /* 모달 생성 관련 함수 */
        $(".btn-create").click(function () {
            $("dialog").show();
            $("dialog").attr('style', 'display: block');
            $("#title").val('');
            editor.setHTML('');
            $("#title").focus();
            $("#create").text('등록');
            $("#update").css('display', 'none');
            $("#create").css('display', 'block');
        });

        $("#create").click(function () {

            /* 제목 입력 안 했을 경우 */
            if ($("#title").val() == "") {
                swal({
                    title: "제목을 입력하세요.",
                    type: 'warning'
                });
                $("#title").focus();
                return false;
            }

            /* 내용 입력 안 했을 경우 */
            if (editor.getHTML() == "<p><br></p>") {
                swal({
                    title: "내용을 입력하세요.",
                    type: 'warning'
                });
                $(".ProseMirror toastui-editor-contents").focus();
                return false;
            }

            /* 게시글 작성 시 전달하는 데이터 */
            let data = {};
            data.username = user.username;
            data.writer = user.name;
            data.title = $("#title").val();
            data.content = editor.getHTML();
            data.category = $("#category").val();

            _this.create(data);
        })

        /* 게시글 상세 수정 */
        this.grid.on('click', (ev) => {
            let _this = this;
            let selectedColumn = ev.columnName;

            /* 번호를 선택한 경우만 수행 */
            if (selectedColumn != "post_id") return false;

            /* 다른 사람 글 수정하려고 하면 reject */
            if (_this.grid.getRow(ev.rowKey).username != user.username) {
                swal({
                    title: "내가 작성한 글만 수정할 수 있어요.",
                    type: 'warning'
                });
                return false;
            }

            /* Column을 클릭했을 때만 수행 */
            let focusCell = this.grid.getFocusedCell();

            if (focusCell) {

                $("dialog").show();
                $("#dialog_title").text('게시 글을 수정해보세요! 😙');
                $("#create").text('수정');
                $("#update").css('display', 'block');
                $("#create").css('display', 'none');

                /* 기존 내용 모달에 붙여 넣기 */
                $("#title").val(_this.grid.getRow(ev.rowKey).title);
                $("#category").val(_this.grid.getRow(ev.rowKey).category);
                editor.setHTML(_this.grid.getRow(ev.rowKey).content);

                $("#update").click(function () {

                    /* 제목 입력 안 했을 경우 */
                    if ($("#title").val() == "") {
                        swal({
                            title: "제목을 입력하세요.",
                            type: 'warning'
                        });
                        $("#title").focus();
                        return false;
                    }

                    /* 내용 입력 안 했을 경우 */
                    if (editor.getHTML() == "<p><br></p>") {
                        swal({
                            title: "내용을 입력하세요.",
                            type: 'warning'
                        });
                        $(".ProseMirror toastui-editor-contents").focus();
                        return false;
                    }

                    /* 게시글 수정 시 전달하는 데이터 파싱 */
                    let data = [];

                    let dialogData = {
                        "title": $("#title").val(),
                        "content": editor.getHTML(),
                        "post_id": _this.grid.getRow(ev.rowKey).post_id,
                        "category": $("#category").val(),
                        "updated": true
                    };

                    data.push(dialogData);
                    _this.update(data);
                })
            }
        });
    },

    /* CRUD 함수들 */
    /* CREATE */
    create: function (data) {
        let _this = this;

        $.ajax({
            type: "PUT",
            url: "/post",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                username: data.username,
                writer: data.writer,
                title: data.title,
                content: data.content,
                category: data.category
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                $("dialog").hide();
                _this.read();
            },
            error: function () {

            }
        })
    },

    /* READ */
    read: function() {
        let _this = this;
        let data;

        $.ajax({
            type:"POST",
            url:"/post",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                page: this.currentPage, // 현재 페이지
                limit: this.limit, // 한번에 몇 개의 데이터를 보여줄 것인지
                content: $(".search_input").val(),
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response){
                data = response;
                _this.grid.resetData(data);
                // _this.pagination.setTotalItems(response.length);
            },
            error: function(response) {
                console.log(response);
                swal({
                    title: response.responseText,
                    type: 'warning'
                })
            }
        });
        return data;
    },

    /* UPDATE */
    update: function (data) {
        let _this = this;

        $.ajax({
            type: "PATCH",
            url: "/post",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                let list = _this.read();
                if (list) {
                    _this.grid.resetData(list);
                    _this.pagination.setTotalItems(_this.cnt);
                    $("dialog").hide();
                }
            },
            error: function (response) {
                console.log(response)
                // if (response.statusText == "error") window.location.href = "/login";
            }
        })
    },

    /* 삭제 */
    delete: function() {
        let checkRows = [];
        checkRows = this.grid.getCheckedRowKeys();

        this.grid.uncheckAll();

        for(let i = 0; i < checkRows.length ; i++){
            this.grid.setRow(checkRows[i], $.extend({}, this.grid.getRow(checkRows[i]), {deleted: true}));
            this.grid.disableRow(checkRows[i], true);
        }
    },

    /* 저장 */
    save: function() {
        let _this = this;

        /* grid 블러 처리 */
        this.grid.blur();

        /* 수정된 그리드 정보 변수에 담기 */
        let data = this.grid.getModifiedRows();

        /* 내가 작성한 글이 아니라면 reject */
        for (let i = 0; i < data.updatedRows.length; i++) {
            if (data.updatedRows[i].username != user.username) {
                swal({
                    title: "내가 작성한 글만 수정할 수 있어요.",
                    type: 'warning'
                });
                /* 그리드 다시 활성화 */
                this.grid.enable();
                return false;
            }
        }

        /* 수정된 데이터에 updated flag 붙이기 */
        for (let i = 0; i < data.updatedRows.length; i++) {
            data.updatedRows[i].updated = true;
        }

        let arr = [];
        arr = data.updatedRows;

        $.ajax({
            type: "PATCH",
            url: "/post",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(arr),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response) {
                let list = _this.read();
                if (list) {
                    _this.grid.resetData(list);
                    _this.pagination.setTotalItems(_this.cnt);
                }
            },
            error: function () {
            }
        })
    },

    /* CRUD 도와주는 함수들 */
    /* 데이터 개수 세는 함수 */
    readCnt: function () {
        let _this = this;
        let cnt;

        $.ajax({
            type: "POST",
            url: "/post/cnt",
            async: false,
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                content: $(".search_input").val(),
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(user.csrfHeader, user.csrfToken);
            },
            success: function(response){
                cnt = response;
            },
            error: function() {
            }
        });
        return cnt;
    },
}
