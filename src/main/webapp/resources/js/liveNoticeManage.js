
$(function(){
    liveNoticeManage.init();
});

let liveNoticeManage = {
    SEQ: null,
    editor: null,

    grid: null,
    pagination : null,
    itemCount : null,
    currentPage : 1,
    countPerPage : 14,

    liveNoticeStatus: null,
    liveNoticeTarget: null,

    LIVE_NOTICE_STATUS: null,
    LIVE_NOTICE_TARGET: null,
    worldId: null,

    filterCode: "all",

    init: async function(){
        let _this = this;

        let Grid = tui.Grid;
        Grid.applyTheme('default', toastCustomTheme);

        this.grid = new Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: true,
            bodyHeight: 560,
            data: [],
            rowHeaders: [ 'checkbox' ],
            header: {
                height: 70,
                complexColumns: [
                    {
                        header: "게시 기간",
                        name: "LIVE_NOTICE_VIEW_START_END_DTTM",
                        childNames: ["LIVE_NOTICE_VIEW_START_DTTM", "LIVE_NOTICE_VIEW_END_DTTM"]
                    }
                ]
            },
            columns: [
                {
                    header: "공지 내용",
                    name: "LIVE_NOTICE_CONTENT",
                    align: "center",
                    resizable: true,
                    editor: {
                        type: CustomTextEditor,
                        options: {
                            maxLength: 50
                        }
                    },
                    formatter : function(value){
                        return `<span class="cellClickableText"> ${value.value} </span>`;
                    }
                },
                {
                    header: "시작",
                    name: "LIVE_NOTICE_VIEW_START_DTTM",
                    align: "center",
                    formatter: _this.formatDate,
                    editor: {
                        type: "datePicker",
                        options: {
                            format: 'yyyy-MM-dd HH:mm:00',
                            timepicker: {
                                layoutType: 'tab',
                                inputType: 'spinbox'
                            }
                        }
                    },
                    resizable: true,
                    onBeforeChange(e) {
                        // 종료일 값 가져오기
                        let LIVE_NOTICE_VIEW_END_DTTM = _this.grid.getRow(e.rowKey).LIVE_NOTICE_VIEW_END_DTTM;
                        // 종료일 Date 형식 변환
                        let nextValue = _this.changeDateFormat(e.nextValue);
                        if (nextValue > LIVE_NOTICE_VIEW_END_DTTM) {
                            Toast.AlertShow({body: '시작일은 종료일보다 느릴 수 없습니다.'});
                            e.stopped = true;
                        }
                    },
                },
                {
                    header: "종료",
                    name: "LIVE_NOTICE_VIEW_END_DTTM",
                    align: "center",
                    formatter: _this.formatDate,
                    editor: {
                        type: "datePicker",
                        options: {
                            format: 'yyyy-MM-dd HH:mm:00',
                            timepicker: {
                                layoutType: 'tab',
                                inputType: 'spinbox'
                            }
                        }
                    },
                    resizable: true,
                    onBeforeChange(e) {
                        // 시작일 값 가져오기
                        let LIVE_NOTICE_VIEW_START_DTTM = _this.grid.getRow(e.rowKey).LIVE_NOTICE_VIEW_START_DTTM;
                        // 종료일 Date 형식 변환
                        let nextValue = _this.changeDateFormat(e.nextValue);
                        if (nextValue < LIVE_NOTICE_VIEW_START_DTTM) {
                            Toast.AlertShow({body: '종료일은 시작일보다 빠를 수 없습니다.'});
                            e.stopped = true;
                        }
                    },
                },
                {
                    header: "공지 대상",
                    name: "LIVE_NOTICE_TARGET",
                    align: "center",
                    resizable: true,
                    formatter: 'listItemText',
                    editor: {
                        type: 'select',
                        options: {
                            listItems: _this.liveNoticeTarget
                        }
                    }
                },
                {
                    header: "반복 횟수",
                    name: "LIVE_NOTICE_REPEAT_COUNT",
                    align: "center",
                    editor: 'text',
                    onBeforeChange(e) {
                        let columnName = e.columnName;
                        let newValue = e.nextValue;
                        if (columnName === "LIVE_NOTICE_REPEAT_COUNT" && !/^[1-5]$/.test(newValue)) {
                            Toast.AlertShow({body: '1에서 5 사이의 숫자만 입력할 수 있습니다.'});
                            e.stopped = true;
                        }
                    },
                    formatter: function(Data) {
                        return `<p>${Data.value}회</p>`
                    }
                },
                {
                    header: "게시 상태",
                    name: "LIVE_NOTICE_STATUS",
                    align: "center",
                    formatter: 'listItemText',
                    editor: {
                        type: 'select',
                        options: {
                            listItems: _this.liveNoticeStatus,
                        }
                    },
                },
                {
                    header: "등록일시",
                    name: "CREATE_DT",
                    align: "center",
                    formatter: function(a) {
                        return moment(a.value, "YYYY-MM-DDTHH:mm:ss").format('YYYY-MM-DD HH:mm:ss');
                    },
                },
            ],
        });

        let result = this.read();

        this.pagination = new tui.Pagination(document.getElementById('pagination'),    {
            visiblePages: 5,
            totalItems : this.itemCount,
            itemsPerPage: this.countPerPage,
            centerAlign: true
        });


        if (result) {
            this.grid.resetData(result);
            this.pagination.setTotalItems(this.itemCount);
        }

        this.pagination.on('afterMove', function (ev) {
            _this.currentPage = ev.page;
            let result = _this.read();
            if (result) {
                _this.grid.resetData(result);
                _this.pagination.setTotalItems(_this.itemCount)
            }
        });

    },
    /* 아래는 CRUD 기능을 하는 함수들 */

    /* 조회 */
    read: function(){
        let _this = this;

        let rtn = null;
        rtn = ajax.payload("POST", "/liveNoticeManage", JSON.stringify({
            page : this.currentPage, // 이건 1234이고
            length: this.countPerPage, // 몇 개씩 볼지.
            LIVE_NOTICE_TARGET: this.filterCode
        }), true);

        if (rtn?.result === true) {
            _this.grid.resetData(rtn.data?.DATA);
            this.itemCount = rtn.data.count;
            return rtn.data?.DATA;
        } else {
            console.log(rtn);
            Toast.AlertShow({body: rtn});
            return false;
        }
    },

    /* 등록 */
    insert: function() {
        let _this = this;

        let data = _this.getModalData();

        if (!data) {
            return false;
        }

        let rtn = null;
        rtn = ajax.payload("PUT", "/liveNoticeManage", JSON.stringify(data),true);

        if (rtn?.result === true) {
            Toast.circleCheckShow({body : "등록이 완료되었습니다."});
            $('#exampleModal').modal("hide");
            _this.read();
            return true;
        } else {
            console.log(rtn);
            Toast.AlertShow({body: rtn});
            return false;
        }

    },

    /* 수정 */
    update: function() {
        let _this = this;

        let data = [];
        let modalData = _this.getModalData();

        if (!modalData) {
            return false;
        }

        data.push(modalData);
        modalData.SEQ = _this.SEQ;
        modalData.updated = true;

        let rtn = null;

        rtn = ajax.payload("PATCH", "/liveNoticeManage", JSON.stringify(data), true);

        if (rtn?.result === true) {
            Toast.circleCheckShow({body : "수정이 완료되었습니다."});
            $('#exampleModal').modal("hide");
            $('#exampleModal').on('hidden.bs.modal', function (e) {
                $(this).find('form ')[0].reset();
            });
            _this.read();
            return true;
        } else {
            Toast.AlertShow({body: rtn});
            return false;
        }

    },

    /* 숨김 */
    hide: function() {
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

        this.grid.blur();

        let data = this.grid.getModifiedRows();

        /* 변경된 데이터가 없는데 저장 버튼을 누르는 경우 */
        if (commonFunction.isEmpty(data.updatedRows)) {
            Toast.AlertShow({body: "변경된 데이터가 없습니다."});
            return false;
        }

        /* 게시기간 날짜 형식 바꿔주는 코드 */
        for (let i = 0; i < data.updatedRows.length; i++) {
            data.updatedRows[i].updated = true;
            if(data.updatedRows[i].LIVE_NOTICE_VIEW_START_DTTM != null && data.updatedRows[i].LIVE_NOTICE_VIEW_START_DTTM != '' && !data.updatedRows[i].LIVE_NOTICE_VIEW_START_DTTM.includes('T')){
                data.updatedRows[i].LIVE_NOTICE_VIEW_START_DTTM = moment(data.updatedRows[i].LIVE_NOTICE_VIEW_START_DTTM, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
            }
            if(data.updatedRows[i].LIVE_NOTICE_VIEW_END_DTTM != null && data.updatedRows[i].LIVE_NOTICE_VIEW_END_DTTM != ''  && !data.updatedRows[i].LIVE_NOTICE_VIEW_END_DTTM.includes('T')){
                data.updatedRows[i].LIVE_NOTICE_VIEW_END_DTTM = moment(data.updatedRows[i].LIVE_NOTICE_VIEW_END_DTTM, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
            }
        }

        let arr = [];
        arr = data.updatedRows;
        let rtn = null;

        rtn = ajax.payload("PATCH", "/liveNoticeManage", JSON.stringify(arr), true);

        if (rtn?.result === true) {
            Toast.circleCheckShow({body : "저장되었습니다."});
            _this.read();
            return true;
        } else {
            Toast.AlertShow({body: rtn});
            return false;
        }
    },


    /* 아래는 CRUD 기능을 도와주는 함수들 */

    /* 공지 대상(worldId) 가져오는 함수 */
    getWorldId: function() {
        let rtn = null;
        rtn = ajax.payload("GET", "/accountManage/worldIDAndTitle", {}, true);

        if (rtn?.result === true){
            this.worldId = rtn.data?.DATA;
            return rtn.data?.DATA;
        } else {
            Toast.AlertShow({body: rtn});
            return false;
        }
    },

    /* modal내 DatePicker 사용하게 해주는 함수 */
    modalFunction: function() {
        let _this = this;

        /* 모달 내 DatePicker */
        this.startDatePicker = new tui.DatePicker('#tui-datepicker_start',
            {
                language: 'ko',
                date: new Date(),
                input: {
                    element: '#LIVE_NOTICE_VIEW_START_DTTM',
                    format: 'yyyy-MM-dd HH:mm'
                },
                timePicker: {
                    layoutType: 'tab',
                    inputType: 'spinbox'
                }
            });

        this.endDatePicker = new tui.DatePicker('#tui-datepicker_close',
            {
                language: 'ko',
                date: new Date(),
                input: {
                    element: '#LIVE_NOTICE_VIEW_END_DTTM',
                    format: 'yyyy-MM-dd HH:mm'
                },
                timePicker: {
                    layoutType: 'tab',
                    inputType: 'spinbox'
                }
            });
    },

    eventInit: function() {
        let _this = this;

        /* 검색 이벤트 */
        $("#liveNoticeAuthFilter").on("change", function (){
            _this.filterCode = $(this).val();
            _this.read();
        });

        $("#closeModal").on('click', function() {
            $("input[name='LIVE_NOTICE_VIEW_TIME']").prop('checked', false);
        })

        /** 등록 버튼 클릭 이벤트 */
        $("#BtnCreateLiveNotice").on("click", function(){
            Modal.show();
            _this.startDatePicker.setDate(new Date());
            _this.endDatePicker.setDate(new Date());
            $("#insertModalBtn").attr('onclick', 'liveNoticeManage.insert()');
            /* 게시 상태 보기 */
            $("tr#STATUS").hide();
        });

        this.grid.on('check', function(ev) {
            let key = ev.rowKey;
            _this.grid.addRowClassName(key, ToastCustomClassName.CHECKED);
        });

        this.grid.on('uncheck', function(ev) {
            let key = ev.rowKey;
            _this.grid.removeRowClassName(key, ToastCustomClassName.CHECKED);
        });

        this.grid.on('checkAll', function(){
            let checkedList = _this.grid.getCheckedRowKeys();
            if(checkedList.length > 0){
                for(let i = 0 ; i < checkedList.length ; i++){
                    _this.grid.addRowClassName(checkedList[i], ToastCustomClassName.CHECKED);
                }
            }
        });

        this.grid.on('uncheckAll', function() {
            let data = _this.grid.getData();

            for(let i = 0 ; i < data.length ; i++ ){
                _this.grid.removeRowClassName(i, ToastCustomClassName.CHECKED);
            }
        });
    },

    /* modal Data를 가져오는 함수 */
    getModalData: function() {
        let _this =  this;

        /* 사용자 입력값 변수에 저장 */
        let LIVE_NOTICE_CONTENT = $("#LIVE_NOTICE_CONTENTS").val();
        let LIVE_NOTICE_STATUS = $("#LIVE_NOTICE_STATUS").val();
        let LIVE_NOTICE_VIEW_START_DTTM = $("#LIVE_NOTICE_VIEW_START_DTTM").val();
        let LIVE_NOTICE_VIEW_END_DTTM = $("#LIVE_NOTICE_VIEW_END_DTTM").val();
        let LIVE_NOTICE_REPEAT_COUNT = $("#LIVE_NOTICE_REPEAT_COUNT").val();
        let LIVE_NOTICE_TARGET = $("#LIVE_NOTICE_TARGET").val();

        let LIVE_NOTICE_VIEW_TIME = 0;
        $("input[name='LIVE_NOTICE_VIEW_TIME']:checked").each(async function() {
            LIVE_NOTICE_VIEW_TIME = LIVE_NOTICE_VIEW_TIME | $(this).val();
        });

        // 2진수로 변환(숫자 -> 문자)
        // LIVE_NOTICE_VIEW_TIME = Number (LIVE_NOTICE_VIEW_TIME).toString(2);

        console.log(LIVE_NOTICE_VIEW_TIME);
        console.log(typeof LIVE_NOTICE_VIEW_TIME);

        let FORMATTED_LIVE_NOTICE_VIEW_START_DTTM;
        let FORMATTED_LIVE_NOTICE_VIEW_END_DTTM;

        if (LIVE_NOTICE_VIEW_START_DTTM) {
            FORMATTED_LIVE_NOTICE_VIEW_START_DTTM = _this.changeDateFormat(LIVE_NOTICE_VIEW_START_DTTM);
        }

        if (LIVE_NOTICE_VIEW_END_DTTM) {
            FORMATTED_LIVE_NOTICE_VIEW_END_DTTM = _this.changeDateFormat(LIVE_NOTICE_VIEW_END_DTTM);
        }

        /* 유효성 검사 */
        if (commonFunction.isEmpty(LIVE_NOTICE_CONTENT)) {
            Toast.AlertShow({body: "공지사항 내용을 입력해주세요."});
            $("#LIVE_NOTICE_CONTENTS").focus();
            return false;
        }

        if (FORMATTED_LIVE_NOTICE_VIEW_START_DTTM > FORMATTED_LIVE_NOTICE_VIEW_END_DTTM) {
            Toast.AlertShow({body: "종료일은 시작일보다 빠를 수 없습니다."});
            $("#LIVE_NOTICE_VIEW_END_DTTM").focus();
            return false;
        }

        if (LIVE_NOTICE_VIEW_TIME === 0) {
            Toast.AlertShow({body: "노출 시간을 입력해주세요"});
            $("#LIVE_NOTICE_VIEW_TIME").focus();
            return false;
        }

        if (commonFunction.isEmpty(LIVE_NOTICE_REPEAT_COUNT)) {
            Toast.AlertShow({body: "반복 횟수을 입력해주세요."});
            $("#LIVE_NOTICE_REPEAT_COUNT").focus();
            return false;
        }

        if (LIVE_NOTICE_REPEAT_COUNT < 1 || LIVE_NOTICE_REPEAT_COUNT > 5) {
            Toast.AlertShow({body: "반복 횟수는 1~5 사이의 숫자만 입력해주세요."});
            $("#LIVE_NOTICE_REPEAT_COUNT").focus();
            return false;
        }

        /* DB에 전달할 데이터 파싱 */
        let data = {
            LIVE_NOTICE_CONTENT: LIVE_NOTICE_CONTENT,
            LIVE_NOTICE_STATUS: LIVE_NOTICE_STATUS,
            LIVE_NOTICE_VIEW_START_DTTM: FORMATTED_LIVE_NOTICE_VIEW_START_DTTM,
            LIVE_NOTICE_VIEW_END_DTTM: FORMATTED_LIVE_NOTICE_VIEW_END_DTTM,
            LIVE_NOTICE_VIEW_TIME: LIVE_NOTICE_VIEW_TIME,
            LIVE_NOTICE_REPEAT_COUNT: LIVE_NOTICE_REPEAT_COUNT,
            LIVE_NOTICE_TARGET: LIVE_NOTICE_TARGET
        }
        return data;
    },

    /* 코드를 코드 값으로 변경해서 보여주는 함수 */
    getFormatCode : function(item, base){
        for (let i = 0 ; i < base.length; i++){
            if (base[i].CODE === item.value) {
                return base[i].CODE_VALUE;
            }
        }
        return "-";
    },

    /* 십진수를 24자리의 이진수로 바꿔주는 함수 */
    toBinary: function(decimalNum) {
        let padding = '000000000000000000000000';
        let binaryNum = (padding + decimalNum.toString(2)).substr(-padding.length);
        return binaryNum;
    },

    /* 코드의 값을 반환하는 함수 */
    getCodeValue : function(item){
        let result = [];
        for(let i=0; i < item.length; i++){
            result.push({text:item[i].CODE_VALUE , value: item[i].CODE});
        }
        return result;
    },

    /* 시간 형식 변경해주는 함수
     * 아래와 같은 형식으로 변환 됨.
     * ex) 2023-05-11 11:21 -> 2023-05-11T11:21:00 */
    changeDateFormat: function(Data) {
        const TIME_ZONE = 9 * 60 * 60 * 1000;
        let EDITED_Date = new Date(Data);
        let FORMATED_DATE = new Date(EDITED_Date.getTime() + TIME_ZONE).toISOString().slice(0, -8)+":00";
        return FORMATED_DATE;
    },

    /* 시간 표시 형식을 변경해주는 함수 */
    formatDate : function(value){
        return moment(value.value, "YYYY-MM-DDTHH:mm:ss").format('YYYY-MM-DD HH:mm:ss');
    },

    /* <select>내 <option> 동적으로 생성해주는 함수 */
    getOptionBox: function(item, selectArea) {
        for (let i = 0 ; i < item.length ; i++) {
            let option = $(`<option value="${item[i].CODE}"> ${item[i].CODE_VALUE}</option>`);
            selectArea.append(option);
        }
    },

    /* 검색창 내 공지 대상 동적으로 생성해주는 함수 */
    setOptionBox: function(item) {
        for (let i = 0; i < item.length; i++) {
            let option = $(`<option value="${item[i].WORLD_ID}"> ${item[i].WORLD_ID}</option>`);
            $("#liveNoticeAuthFilter").append(option);
        }
    },

    /* <select>내 공지 대상 <option> 동적으로 생성해주는 함수 */
    getWorldIdOptionBox: function(item, selectArea) {
        for (let i = 0; i < item.length; i++) {
            let option = $(`<option value="${item[i].WORLD_ID}"> ${item[i].WORLD_ID}</option>`);
            selectArea.append(option);
        }
    },

    /* 모달 내 전체 선택 시 자동 선택하게 해주는 함수 */
    selectAllTime: function() {
        $("#LIVE_NOTICE_VIEW_TIME_ALL").on('click', function() {
            if ($("#LIVE_NOTICE_VIEW_TIME_ALL").prop('checked')) {
                $("input[name='LIVE_NOTICE_VIEW_TIME']").prop('checked', true);
            } else {
                $("input[name='LIVE_NOTICE_VIEW_TIME']").prop('checked', false);
            }
        })
    },

    /* 모달 내 노출 시간 inputBox 수정하는 함수 */
    updateModalCSS: function() {
        $('td.btn-group.btn-group-lg').css('border', 'none');
        $(".btn").css("border-radius", "4px");
    },

    /* 시간 형식 변경해주는 함수
     * 아래와 같은 형식으로 변환 됨.
     * ex) 2023-05-11T11:21:00 -> 2023-05-11 11:21*/
    reverseDateFormat: function (Data) {
        let date = Data.slice(0, 10);
        let time = Data.slice(11, 16);

        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);

        let hour = time.slice(0, 2);
        let minute = time.slice(3, 5);

        let FORMATED_DATE = `${year}-${month}-${day} ${hour}:${minute}`;

        return FORMATED_DATE;
    },
}

let Modal = {
    modal: null,
    init: async function () {
        let _this = this;
        _this.modal = new bootstrap.Modal($('#exampleModal'), {backdrop: 'static', keyboard: false});
        $("#insertModalBtn").on('click', () => {
        });
    },
    show: function () {
        let _this = this;

        _this.resetModalContent();  //모달 오픈전 초기화

        return new Promise((res, rej) => {
            _this.modal.show();
            _this.res = res;
            _this.rej = rej;
        });
    },
    hide : function(){
        this.modal.hide();
    },
    resetModalContent : function(){
        // liveNoticeManage.editor.reset();

        $('#addLiveNoticeForm')[0].reset();
    },
}