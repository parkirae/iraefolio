<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - 계정 관리</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/account.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/account.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>계정 관리 🧐🤔</span>

            <c:choose>
                <c:when test="${user != null}">
                    <div class="text">계정 관리<br />
                        <p class="plain">계정 관리</p>
                    </div>
                </c:when>
                <c:otherwise>
                    <div class="text">팁: review는 회원가입해야 작성할 수 있어요!<br />
                        <p class="plain">회원가입을 하시려면 <a href="/">여기</a>를 클릭해 주세요!</p>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
        <div class="btn-box">
            <div class="btn-create">등록</div>
            <div class="btn-delete">삭제</div>
            <div class="btn-save">저장</div>
            <div class="search">
                <input type="text" class="search_input"/>
                <img src="../../resources/images/review/searchIcon.png">
            </div>
        </div>
        <dialog style="display: none">
            <form method="post">
                <table>
                    <tbody>
                    <tr style="height: 30px">
                        <th colspan="2" id="dialog_title">새로운 사용자를 등록하세요. 🥰</th>
                    </tr>
                    <tr>
                        <td><div id="titleBox">아이디</div></td>
                        <td><input type="text" id="title" maxlength="100" placeholder="아이디를 입력하세요."></td>
                    </tr>
                    <tr>
                        <button type="button" id="create">등록</button>
                        <button type="button" id="update">수정</button>
                        <button type="button" id="close">닫기</button>
                    </tr>
                    </tbody>

                </table>

            </form>
        </dialog>
    </div>

    <div class="gridWrapper">
        <div id="grid"></div>
        <div id="pagination" class="tui-pagination"></div>
    </div>
</section>


<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>