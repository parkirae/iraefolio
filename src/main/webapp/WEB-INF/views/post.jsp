<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - 게시글 관리</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/post.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/post.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>post 🧑‍💼✍️</span>

            <c:choose>
                <c:when test="${user != null}">
                    <div class="text">팁: 게시글은 운영자만 관리할 수 있어요.<br />
                        <p class="plain">번호를 누르면 상세 수정할 수 있어요!</p>
                    </div>
                </c:when>
                <c:otherwise>
                    <div class="text">팁: review는 회원가입해야 작성할 수 있어요!<br />
                        <p class="plain">회원가입을 하시려면 <a href="/">여기</a>를 클릭해 주세요!</p>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
        <div class="btn-box">
            <div class="btn-create">등록</div>
            <div class="btn-delete">삭제</div>
            <div class="btn-save">저장</div>
            <div class="search">
                <input type="text" class="search_input"/>
                <img src="../../resources/images/review/searchIcon.png">
            </div>
        </div>
        <dialog style="display: none">
            <form method="post">
                <table>
                    <tbody>
                    <tr style="height: 30px">
                        <th colspan="2" id="dialog_title">새로운 글을 작성해보세요! 🥰</th>
                    </tr>
                    <tr>
                        <td><div id="titleBox">제목</div></td>
                        <td><input type="text" id="title" maxlength="100"></td>
                    </tr>
                    <tr>
                        <td><div id="categoryBox">카테고리</div></td>
                        <td>
                            <select id="category">
                                <option value="JAVA">JAVA</option>
                                <option value="SpringBoot">SpringBoot</option>
                                <option value="SpringSecurity">SpringSecurity</option>
                                <option value="MyBatis">MyBatis</option>
                                <option value="MariaDB">MariaDB</option>
                                <option value="jQuery">jQuery</option>
                                <option value="JSP">JSP</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><div id="content"></div></td>
                    </tr>
                    <tr>
                        <button type="button" id="create">등록</button>
                        <button type="button" id="update">수정</button>
                        <button type="button" id="close">닫기</button>
                    </tr>
                    </tbody>

                </table>

            </form>
        </dialog>
    </div>

    <div class="gridWrapper">
        <div id="grid"></div>
        <div id="pagination" class="tui-pagination"></div>
    </div>
</section>


<!-- Footer -->
<%@include file="common/footer.jsp"%>
</body>
</html>