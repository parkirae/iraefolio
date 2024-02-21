<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>

    <title>iraefolio - login</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/login.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/login.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>더 많은 기능을 이용하시려면 로그인하세요. 🥰😘</span>
        </div>
    </div>

    <div class="boxWrapper">
        <div class="input-box">
            <form action="/login" id="loginForm" method="post">
                <input type="text" name="username" id="id" placeholder=" 아이디를 입력해주세요." autocomplete="new-password"/>
                <p id="signUp"><a href="/signUp">회원가입</a></p>
                <p id="idInformation" style="display: none">아이디를 입력하고 엔터를 쳐보세요!</p>
                <img src="../../resources/images/common/return.png" alt="return icon" id="idIcon" class="icon" style="display: none"/>
                <input type="password" name="password" id="password" placeholder=" 비밀번호를 입력해주세요." autocomplete="new-password" style="display: none"/>
                <img src="../../resources/images/common/return.png" alt="return icon" id="passwordIcon" class="icon" style="display: none"/>
                <p id="pwInformation" style="display: none">비밀번호를 입력하고 엔터를 쳐보세요!</p>
                <input type="hidden" name="_csrf" value="${_csrf.token}"/>
                <button type="submit" id="submitBtn" style="display: none" disabled></button>
                <c:if test="${error != null}">
                    <p id="loginFailMsg">${exception}</p>
                </c:if>
            </form>
        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>