<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

    <title>iraefolio - 계정 관리</title>

    <!-- Icon -->
    <link rel="icon" href="../../resources/images/logo.png">

    <!-- Library -->
    <%@include file="common/library.jsp"%>

    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/css/account.css">

    <!-- JS -->
    <script type="text/javascript" src="../../resources/js/account.js"></script>

</head>
<body>
<!-- Header -->
<%@include file="common/header.jsp"%>

<section class="main">

    <div class="inner">
        <div class="text-box">
            <span>계정 관리 🧐🤔</span>
                <div class="text">팁: 권한을 선택하고 권한을 조정해보세요.<br />
                    <p class="plain">운영자의 권한은 조정할 수 없어요 :)</p>
                </div>
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
                        <th colspan="2" id="dialog_title">새로운 사용자를 등록하세요. 🥰</th>
                    </tr>
                    <tr>
                        <td><div id="usernameBox">아이디</div></td>
                        <td><input type="text" id="username" maxlength="20" placeholder="아이디를 입력하세요."></td>
                        <td><p id="usernameInform">아이디를 입력하고 엔터를 쳐보세요!</p></td>
                    </tr>
                    <tr>
                        <td><div id="passwordBox">비밀번호</div></td>
                        <td><input type="text" id="password" placeholder="초기 비밀번호는 '1234'입니다." readonly onfocus="this.blur()"></td>
                        <td><p id="passwordInform" style="display: none">비밀번호는 초기 비밀번호로 설정됩니다.</p></td>
                    </tr>
                    <tr>
                        <td><div id="nameBox">이름</div></td>
                        <td><input type="text" id="name" maxlength="100" placeholder="이름을 입력하세요."></td>
                        <td><p id="nameInform" style="display: none">멋진 이름이네요!</p></td>
                    </tr>
                    <tr>
                        <td><div id="authorityBox">권한</div></td>
                        <td>
                            <select id="authority">
                                <option value="ROLE_USER">사용자</option>
                                <option value="ROLE_ADMIN">관리자</option>
                            </select>
                        </td>
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