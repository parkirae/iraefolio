<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - ${detail.TITLE}</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/postDetail.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/postDetail.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="byline-box">
            <span id="category">${detail.CATEGORY} > 가장 완벽한 객체지향 언어</span><br />

            <span id="title">${detail.TITLE}</span><br />

            <span id="writer">${detail.WRITER}</span><br />

            <span id="create_dt">업데이트 ${detail.CREATE_DT}</span><br />

            <div id="hr" />

            <span id="content">${detail.CONTENT}</span>
        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>