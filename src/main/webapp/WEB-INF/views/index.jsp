<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/index.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/index.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<!-- MAIN -->
<section class="main">
    <div class="inner">
        <div class="text-box">
            <span class="main-text">Spring Boot<br /></span>
            <span class="sub-text">더 쉽고, 안전하게</span><br />
            <a href="/">더 알아보기 ></a>
        </div>
        <img src="../../resources/images/index/spring.png" alt="spring logo" style="width: 450px; height: 450px">
    </div>
</section>

<%-- sub --%>
<section class="sub">
    <div class="inner">
        <div class="text-box">
            <span class="main-text">MyBatis<br /></span>
            <span class="sub-text">가뿐하게, 강력하게</span><br />
            <a href="/">더 알아보기 ></a>
        </div>
        <img src="../../resources/images/index/mybatis.png" alt="mybatis logo" style="width: 800px; height: 800px">
    </div>
</section>

<%-- third --%>
<section class="third">
    <div class="inner">
        <div class="text-box">
            <span class="main-text">MariaDB<br /></span>
            <span class="sub-text">영속; 영원히 계속하다</span><br />
            <a href="/">더 알아보기 ></a>
        </div>
        <img src="../../resources/images/index/mariaDB.png" alt="mariaDB logo" style="width: 900px; height: 900px">
    </div>
</section>

<%-- fourth --%>
<section class="fourth">

    <div class="left">
        <div class="inner">
            <div class="text-box">
                <span class="main-text">jQuery<br /></span>
                <span class="sub-text">적은 것이 많은 것</span><br />
                <a href="/">더 알아보기 ></a>
            </div>
            <img src="../../resources/images/index/jquery.png" alt="jQuery" style="width: 500px; height: 500px">
        </div>
    </div>

    <div class="right">
        <div class="inner">
            <div class="text-box">
                <span class="main-text">JSP<br /></span>
                <span class="sub-text">펼치다</span><br />
                <a href="/">더 알아보기 ></a>
            </div>
            <img src="../../resources/images/index/jsp.png" alt="jsp" style="width: 500px; height: 500px">
        </div>
    </div>

</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>