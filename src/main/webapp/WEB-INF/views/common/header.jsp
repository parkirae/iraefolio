<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!-- Common CSS -->
<link rel="stylesheet" href="../../resources/css/common.css" />

<!-- CSS -->
<link rel="stylesheet" href="../../resources/css/header.css" />

<!-- JS -->
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
  user.memberId = '${user.getMemberId()}';

  let userAuthority = '${user.getAuthorities()}';
  if (userAuthority.includes('ROLE_SUPER')) {
    user.role = "ROLE_SUPER";
  } else if (userAuthority.includes('ROLE_ADMIN')) {
     user.role = "ROLE_ADMIN";
  } else if (userAuthority.includes('ROLE_USER')) {
    user.role = 'ROLE_USER';
  } else {
    user.role = 'ROLE_ANONYMOUS'
  }
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
                <ul id="JAVA">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'JAVA'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="SpringBoot">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'SpringBoot'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="SpringSecurity">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'SpringSecurity'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="MyBatis">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'MyBatis'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="MariaDB">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'MariaDB'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="jQuery">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'jQuery'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                <ul id="JSP">
                  <c:forEach var="item" items="${data}">
                    <c:if test="${item.CATEGORY eq 'JSP'}">
                      <li><a href="/header/${item.TITLE}">${item.TITLE}</a></li>
                    </c:if>
                  </c:forEach>
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
                    <h4>더 많은 기능을 이용하시려면 <a href="/login">로그인</a>하세요!</h4>
                  </c:otherwise>
                </c:choose>
                <ul id="isAdmin">
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