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

<!-- MAIN HEADER -->
<section class="main-header">
    <div class="inner">
        <div class="text-box">
            <c:choose>
                <c:when test="${user != null}">
                    ${user.getUsername()} 님, 환영합니다!
                </c:when>
                <c:otherwise>
                    더 많은 기능을 이용하시려면 로그인 하세요!
                </c:otherwise>
            </c:choose>
        </div>
            <c:choose>
                <c:when test="${user != null}">
                    <div class="logout"><a href="/logout" id="btn-logout">logout</a></div>
                </c:when>
                <c:otherwise>
                    <div class="logout"><a href="/login" id="btn-logIn">logIn</a></div>
                </c:otherwise>
            </c:choose>
    </div>
</section>

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
<!--NOTICE-->
<section class="notice">

    <!--NOTICE LINE-->
    <div class="notice-line">
        <div class="bg-left"></div>
        <div class="bg-right"></div>
        <div class="inner">

            <div class="inner__left">
                <h2>공지사항</h2>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <a href="javascript:void(0)">크리스마스 & 연말연시 스타벅스 매장 영업시간 변경 안내</a>
                        </div>
                        <div class="swiper-slide">
                            <a href="javascript:void(0)">[당첨자 발표] 2021 스타벅스 플래너 영수증 이벤트</a>
                        </div>
                        <div class="swiper-slide">
                            <a href="javascript:void(0)">스타벅스커피 코리아 애플리케이션 버전 업데이트 안내</a>
                        </div>
                        <div class="swiper-slide">
                            <a href="javascript:void(0)">[당첨자 발표] 뉴이어 전자영수증 이벤트</a>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0)" class="notice-line__more">
                    <span class="material-icons">add_circle</span>
                </a>
            </div>

            <div class="inner__right">
                <h2>스타벅스 프로모션</h2>
                <div class="toggle-promotion open">
                    <div class="material-icons">upload</div>
                </div>
            </div>

        </div>
    </div>
<%--<section class="fourth">--%>

<%--    <div class="inner">--%>
<%--        <div class="left">--%>
<%--            <div class="text-box">--%>
<%--                <span class="main-text">jQuery<br /></span>--%>
<%--                <span class="sub-text">적은 것이 많은 것</span><br />--%>
<%--                <a href="/">더 알아보기 ></a>--%>
<%--            </div>--%>
<%--            <img src="../../resources/images/index/jquery.png" alt="jQuery" style="width: 500px; height: 500px">--%>
<%--        </div>--%>
<%--    </div>--%>

<%--    <div class="inner">--%>
<%--        <div class="right">--%>
<%--            <div class="text-box">--%>
<%--                <span class="main-text">JSP<br /></span>--%>
<%--                <span class="sub-text">펼치다</span><br />--%>
<%--                <a href="/">더 알아보기 ></a>--%>
<%--            </div>--%>
<%--            <img src="../../resources/images/index/jsp.png" alt="jsp" style="width: 500px; height: 500px">--%>
<%--        </div>--%>
<%--    </div>--%>

<%--</section>--%>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>