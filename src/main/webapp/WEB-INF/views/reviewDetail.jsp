<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - ${data.TITLE}</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/reviewDetail.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/reviewDetail.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>
<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>review Detail 😀😂</span>
            <div class="text">
                <p class="plain">새로운 글을 작성하려면 <a href="/review">여기</a>를 클릭해 주세요!</p>
            </div>
        </div>

        <div class="content">
            <div class="content_titleName"> 제목</div>
            <div class="content_title">${data.TITLE}</div>

            <div class="content_contentName">내용</div>
        </div>

        <div class="content_content">${data.CONTENT}</div>
<%--        ${data.CONTENT}--%>
<%--        ${data.CREATE_DT}--%>
<%--        ${data.UPDATE_DT}--%>
    </div>
</section>


<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>