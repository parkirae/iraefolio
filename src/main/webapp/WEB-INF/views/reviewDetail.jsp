<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - reviewDetail</title>

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
            <div class="text">${data.TITLE}<br />
                <p class="plain">회원가입을 하시려면 <a href="/">여기</a>를 클릭해 주세요!</p>
            </div>
        </div>

        <div class="btn-box">
            <div class="btn-create">등록</div>
            <div class="btn-delete" onclick="review.delete()">삭제</div>
            <div class="btn-save" onclick="review.save()">저장</div>
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
                        <td colspan="2"><div id="content"></div></td>
                    </tr>
                    <tr>
                        <button type="button" id="create">등록</button>
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