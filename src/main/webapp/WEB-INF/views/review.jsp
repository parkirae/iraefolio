<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>review</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/review.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/review.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>review 😀😂</span>
            <div class="text">팁: review는 회원가입해야 작성할 수 있어요!<br />
                <p class="plain">회원가입을 하시려면 <a href="/">여기</a>를 클릭해 주세요!</p>
            </div>
        </div>
    </div>

    <div class="gridWrapper">
        <div id="grid"></div>
    </div>
</section>


<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>