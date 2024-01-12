/*
객체 user는 로그인한 유저 정보를 담고 있음.
header.jsp에 선언되어 있음.
 */

const englishOnly = /^[a-zA-Z]*$/;

$(function() {
  account.init();
});

let account = {

  seq: null,
  pagination : null,
  cnt : null,
  limit : 11,
  currentPage: 1,

  init: function () {
    let _this = this;

    $(".btn-save").attr('onClick', "account.save()");
    $(".btn-delete").attr('onClick', "account.delete()");

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
          name: "member_id",
          align: "center",
        },
        {
          header: "아이디",
          name: "username",
          align: "center",
        },
        {
          header: "이름",
          name: "name",
          align: "center",
          editor: 'text'
        },
        {
          header: "권한",
          name: "authorities",
          align: "center",
          editor: {
            type: 'select',
            options: {
              listItems: [
                { text: '사용자', value: 'ROLE_USER' },
                { text: '관리자', value: 'ROLE_ADMIN' },
              ]
            }
          },
          formatter: function (value) {
            let authorities = value.value[0].authority;

            /* authorities는 DB에서 가져온 값
            *  value.value는 select로 선택한 값 */
            if (authorities === 'ROLE_SUPER' || value.value === 'ROLE_SUPER') {
              return "운영자"
            } else if (authorities === 'ROLE_ADMIN,ROLE_USER' || authorities === 'ROLE_USER,ROLE_ADMIN' || value.value === 'ROLE_ADMIN') {
              return "관리자"
            } else {
              return "사용자"
            }

          },
        }
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
      searchInputEl.attr("placeholder", "이름을 검색하세요.");
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

    /* 모달 생성 관련 함수 */
    $(".btn-create").click(function () {
      $("dialog").show();
      $("dialog").attr('style', 'display: block');
      $("#username").val('');
      $("#username").focus();
      $("#create").text('등록');
      $("#update").css('display', 'none');
    });

    $("#username").on('keydown', function (e) {
      $("#username").on('input', function (e) {
        let input = $(this).val().length;

        if (input == 0) {
          $("#usernameInform").text('아이디를 입력하고 엔터를 쳐보세요!');
        }
      })

      /* 아이디를 입력하지 않고 엔터를 누른 경우 */
      if (e.keyCode === 13 && $("#username").val().length == 0) {
        swal({
          title: "아이디를 입력하세요.",
        });
        return false;
      }

      /* 아이디를 입력하고 엔터를 누른 경우 */
      if ((e.key === 'Tab' || e.keyCode === 13) && $("#username").val().length > 0) {
        let newUsername =  $("#username").val();

        if (newUsername.length < 4) {
          $("#usernameInform").text('아이디는 4글자 이상이여야 해요.');
          return false;
        }

        if (!englishOnly.test(newUsername)) {
          $("#usernameInform").text('아이디는 영어 소문자만 사용할 수 있어요.');
          return false;
        }

        let result = _this.memberCheck(newUsername);
        if (result) {
          swal({
            title: "이미 사용 중인 아이디입니다.",
          });
          return false;
        } else {
          $("#usernameInform").text('멋진 아이디네요!');
          $("#password").attr('disabled', false);

          setTimeout(function () {
            $("#password").focus();
            $("#passwordInform").attr('style', 'display: show');
          }, 0);
        }
      }

    $("#password").on('keydown', function (e) {
      $("#password").on('input', function (e) {
        let input = $(this).val().length;

      })

      /* 비밀번호를 입력하지 않고 엔터를 누른 경우 */
      if (e.keyCode === 13 && $("#password").val().length == 0) {
        swal({
          title: "비밀번호를 입력하세요.",
        });
        return false;
      }

      /* 비밀번호를 입력하고 엔터를 누른 경우 */
      if ((e.key === 'Tab' || e.keyCode === 13) && $("#password").val().length > 0) {
        let password =  $("#password").val();

        if (password.length < 4) {
          $("#passwordInform").text('비밀번호는 4글자 이상이여야 해요.');
          return false;
        }

        $("#passwordInform").attr('style', 'display: show');
        $("#passwordInform").text('멋진 비밀번호에요!');
        $("#name").attr('disabled', false);

          setTimeout(function () {
            $("#name").focus();
            $("#nameInform").attr('style', 'display: show');
          }, 0);
        }
      });

    $("#name").on('keydown', function (e) {
      $("#name").on('input', function (e) {
        let input = $(this).val().length;

      })

      /* 비밀번호를 입력하지 않고 엔터를 누른 경우 */
      if (e.keyCode === 13 && $("#name").val().length == 0) {
        swal({
          title: "이름을 입력하세요.",
        });
        return false;
      }

      /* 비밀번호를 입력하고 엔터를 누른 경우 */
      if ((e.key === 'Tab' || e.keyCode === 13) && $("#name").val().length > 0) {
        let name =  $("#name").val();

        $("#nameInform").text(name + ' 님 반가워요!');
        $("#authority").attr('disabled', false);

        setTimeout(function () {
          $("#authority").focus();
          $("#create").prop('disabled', false);
          $("#create").attr('onClick', "account.create()");
        }, 0);
      }
    });

    })
  },

  /* CRUD 함수들 */
  /* CREATE */
  create: function () {
    let _this = this;
    let data;

    $.ajax({
      type: "POST",
      url: "/create-user",
      data: JSON.stringify({
        username: $("#username").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        authority: $("#authority").val()
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        alert(response)
      },
      error: function (xhr, status, error) {
        console.error("에러:", xhr.responseText);
      }
    });
  },

  /* READ */
  read: function() {
    let _this = this;
    let data;

    $.ajax({
      type:"POST",
      url:"/account",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        page: this.currentPage, // 현재 페이지
        limit: this.limit, // 한번에 몇 개의 데이터를 보여줄 것인지
        name: $(".search_input").val(),
      }),
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
      url: "/account",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(data),
      success: function(response) {
        let list = _this.read();
        if (list) {
          _this.grid.resetData(list);
          _this.pagination.setTotalItems(_this.cnt);
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

    /* row 제거 */
    for(let i = 0; i < checkRows.length ; i++){
      this.grid.removeRow(this.grid.getRow(checkRows[i]).rowKey);
    }
  },

  /* 저장 */
  save: function() {
    let _this = this;

    /* grid 블러 처리 */
    this.grid.blur();

    /* 수정된 그리드 정보 변수에 담기 */
    let data = this.grid.getModifiedRows();

    /* 관리자 혹은 운영자 삭제 시 reject */
    for (let i = 0; i < data.deletedRows.length; i++) {
      if (data.deletedRows[i].authorities.some(authority => authority.authority.includes('ROLE_ADMIN') || authority.authority.includes('ROLE_SUPER'))) {
       swal({
         title: "관리자 혹은 운영자는 삭제할 수 없어요.",
       });
       let list = _this.read();
       if (list) {
         _this.grid.resetData(list);
         _this.pagination.setTotalItems(_this.cnt);
       }
       return false;
     }
    }

    /* 삭제된 데이터에 deleted flag 붙이기 */
    for (let i = 0; i < data.deletedRows.length; i++) {
      data.deletedRows[i].deleted = true;
    }

    /* 수정된 데이터에 updated flag 붙이기 */
    for (let i = 0; i < data.updatedRows.length; i++) {
      data.updatedRows[i].updated = true;
    }

    let arr = [];
    if (data.updatedRows) arr.push(...data.updatedRows);
    if (data.deletedRows) arr.push(...data.deletedRows);

    /* 권한 변경 시 배열 값 수정 */
    for (let i = 0; i < data.updatedRows.length; i++) {
      if (data.updatedRows[i].authorities == 'ROLE_ADMIN') {
        data.updatedRows[i].authorities = [];
        data.updatedRows[i].authorities.push('ROLE_USER', 'ROLE_ADMIN');
      } else {
        data.updatedRows[i].authorities = [];
        data.updatedRows[i].authorities.push('ROLE_USER');
      }
    }

    $.ajax({
      type: "PATCH",
      url: "/account",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(arr),
      success: function() {
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
      url: "/account/cnt",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        content: $(".search_input").val(),
      }),
      success: function(response){
        cnt = response;
      },
      error: function() {
      }
    });
    return cnt;
  },

  memberCheck: function (newUsername) {
    let result;

    $.ajax({
      type:"POST",
      url:"/memberCheck",
      async: false,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify({
        username: newUsername
      }),
      success: function(response){
        result = response;
      },
      error: function(response) {
      }
    });
    return result;
  },
}
