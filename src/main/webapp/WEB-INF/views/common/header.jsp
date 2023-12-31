<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!-- Common CSS -->
<link rel="stylesheet" href="../../resources/css/common.css" />

<!-- Header CSS -->
<link rel="stylesheet" href="../../resources/css/header.css" />

<!-- Header JS -->
<script src="../../resources/js/header.js"></script>

<!-- 사용자 정보 -->
<sec:authorize access="isAuthenticated()">
  <sec:authentication property="principal" var="user"/>
</sec:authorize>

<!-- 로그인 정보 JS 전달 -->
<script type="text/javascript">
  let user = {};
  user.username = '${user.getUsername()}';
  user.name = '${user.getName()}';

  let userAuthority = '${user.getAuthorities()}';
  user.role = userAuthority.includes("ROLE_ADMIN") || userAuthority.includes("ROLE_SUPER") ? "ROLE_ADMIN" : "ROLE_USER";
</script>

<!-- HEADER -->
<header>
  <div class="inner">
    <a href="/" class="logo">
      <img src="../../resources/images/logo.png" alt="LOGO" style="width: 25px; height: 25px; pointer-events : auto;"/>
    </a>

    <ul class="main-menu">
      <li class="item">
        <div class="item__name">Java</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>가장 완벽한 객체지향 언어</h4>
                <ul>
                  <li><a href="java_post">자바</a></li>
                  <li>JAVA 17</li>
                  <li>JAVA 17</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">SpringBoot</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>더 쉽고, 안전하게</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">Spring Security</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>강력한 보안</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">MyBatis</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>가뿐하게, 강력하게</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">MariaDB</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>영속; 영원히 계속하다</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">jQuery</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>적은 것이 많은 것</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">JSP</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <h4>펼치다</h4>
                <ul>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                  <li>Spring 3.0</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li class="item">
        <div class="item__name">Review</div>
        <div class="item__contents">
          <div class="contents__menu">
            <ul class="inner">
              <li>
                <c:choose>
                  <c:when test="${user != null}">
                    <h4>${user.getName()} 님의 상상력을 여기서!</h4>
                  </c:when>
                  <c:otherwise>
                    <h4>더 많은 기능을 이용하시려면 <a href="login">로그인</a>하세요!</h4>
                  </c:otherwise>
                </c:choose>
                <ul id="isAdmin">
                  <li><a href="/review">방명록</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </li>

    </ul>
  </div>
  </div>
</header>