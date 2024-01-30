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
            <div id="category">${detail.CATEGORY} > 가장 완벽한 객체지향 언어</div><br />

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
                        <input type="hidden" id="postID" value="${detail.POST_ID}">
                    </div>
                </c:when>
                <c:otherwise>
                    <textarea id="isNotLoggedIn" placeholder="로그인 후 이용할 수 있습니다."></textarea>
                </c:otherwise>
            </c:choose>

            <div class="hr" />

            <div class="comment-box-comment">
                <c:forEach items="${comment}" var="comment">
                    <div id="commentWriter">
                        <p>${comment.WRITER} </p>
                        <p id="commentUsername">(${comment.USERNAME})</p>
                        <button class="commentMenu">
                            <img src="../../resources/images/common/kebab.png" />

                            <input type="hidden" class="commentId" value="${comment.COMMENT_ID}">
                            <input type="hidden" class="commentUsername" value="${comment.USERNAME}">

                        </button>
                    </div>
                    <div id="commentCreateDT">${comment.CREATE_DT.year}년${comment.CREATE_DT.monthValue}월${comment.CREATE_DT.dayOfMonth}일 ${comment.CREATE_DT.hour}:${comment.CREATE_DT.minute}</div>
                    <div id="commentContent">${comment.CONTENT}</div>

                    <br/>
                </c:forEach>
            </div>

            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>
            <div class="divBox"></div>

        </div>
    </div>
</section>

<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>