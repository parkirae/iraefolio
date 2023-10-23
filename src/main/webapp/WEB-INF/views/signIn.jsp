<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - sign In</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/signIn.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/signIn.js"></script>

</head>
<body>qq
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>반가워요! 🤗😍</span>
        </div>
    </div>

    <div class="boxWrapper">
        <div class="input-box">
            <form action="/signIn" id="signInForm" method="post">
                <input type="text" name="userID" id="id" placeholder=" 아이디를 입력해주세요."/>
                <input type="password" name="password" id="password" placeholder="비밀번호를 입력해주세요." style="display: none"/>
                <img src="../../resources/images/common/return.png" alt="return icon" id="returnIcon" class="icon" style="display: none"/>
                <input type="password" name="password" id="secondPassword" placeholder="비밀번호를 입력해주세요." style="display: none"/>
                <input type="text" name="username" id="username" placeholder="이름을 입력해주세요." style="display: none"/>
                <p>아이디를 입력하고 엔터를 쳐보세요!</p>
            </form>
        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>