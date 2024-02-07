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

    <input type="hidden" id="postID" value="${detail.POST_ID}">
    <input type="hidden" id="postTitle" value="${detail.TITLE}">
    <input type="hidden" id="postCategory" value="${detail.CATEGORY}">

    <div class="inner">
        <div class="byline-box">
            <div id="category">${detail.CATEGORY} >
                <c:set var="categoryMessages" value="${{
                    'JAVA': '가장 완벽한 객체지향 언어',
                    'SpringBoot': '더 쉽고, 안전하게',
                    'SpringSecurity': '강력한 보안',
                    'MyBatis': '가뿐하게, 강력하게',
                    'MariaDB': '영속; 영원히 계속하다',
                    'jQuery': '적은 것이 많은 것',
                    'JSP': '펼치다'
                    }}"
                />

            <c:out value="${categoryMessages[detail.CATEGORY]}" default=""/>

            </div><br />

            <div id="title">${detail.TITLE}</div><br />

            <div id="writer">${detail.WRITER}</div>

            <div id="create_dt">입력 ${detail.CREATE_DT}
                <c:if test="${detail.UPDATE_DT != null}">
                    <button id="showUpdate">
                        <img src="../../resources/images/common/arrow.png" />
                    </button>

                    <div id="update_dt">
                        <p>업데이트 ${detail.UPDATE_DT}</p>
                    </div>
                </c:if>
            </div>

            <div class="hr" />

        </div>

        <div class="content-box">
            <div id="content">${detail.CONTENT}</div>
            <div class="divBox"></div>
        </div>

        <div class="comment-box">
            <div class="comment-box-title">
                <p>댓글</p>
            </div>
            <c:choose>
                <c:when test="${user != null}">
                    <textarea id="isLoggedIn" placeholder="댓글을 입력하세요."></textarea>
                    <div class="comment-box-submit">
                        <button type="button" id="commentSubmit">등록</button>
                    </div>
                </c:when>
                <c:otherwise>
                    <textarea id="isNotLoggedIn" placeholder="로그인 후 이용할 수 있습니다."></textarea>
                </c:otherwise>
            </c:choose>

            <c:if test="${comment.size() != 0}">
            <div class="hr" />
            <div class="comment-box-comment"></div>
            </c:if>
            <div class="divBox"></div>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
<%--            <div class="divBox"></div>--%>
        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>