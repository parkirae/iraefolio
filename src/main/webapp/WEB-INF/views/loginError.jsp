<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<body>qq
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>로그인 에러 🥰😘</span>
        </div>
    </div>

    <div class="boxWrapper">
        <div class="input-box">
            <form action="/login" id="loginForm" method="post">
                <input type="text" name="username" id="id" placeholder=" 아이디를 입력해주세요." autocomplete="new-password"/>
                <p id="signIn"><a href="/signIn">회원가입</a></p>
                <p id="idInformation" style="display: none">아이디를 입력하고 엔터를 쳐보세요!</p>
                <img src="../../resources/images/common/return.png" alt="return icon" id="idIcon" class="icon" style="display: none"/>
                <input type="password" name="password" id="password" placeholder=" 비밀번호를 입력해주세요." autocomplete="new-password" style="display: none"/>
                <img src="../../resources/images/common/return.png" alt="return icon" id="passwordIcon" class="icon" style="display: none"/>
                <p id="pwInformation" style="display: none">비밀번호를 입력하고 엔터를 쳐보세요!</p>
                <c:if test="${error}">
                    <p id="loginFailMsg"><c:out value="${exception}" /></p>
                </c:if>
            </form>
        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>