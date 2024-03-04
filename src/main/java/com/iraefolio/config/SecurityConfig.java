package com.iraefolio.config;

import com.iraefolio.controller.handler.LoginFailHandler;
import com.iraefolio.controller.handler.LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.csrf.*;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Log4j2
@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {

    /* 권한 계층 부여 */
    @Bean
    RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_SUPER > ROLE_ADMIN > ROLE_USER");
        return roleHierarchy;
    }

    /* 자원 접근 조정 및 csrf 토큰 관리 */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                /* 회원 가입, 로그인은 로그인 하지 않은 상태만 가능 */
                .antMatchers("/signUp", "/login").anonymous()
                .and()
                .formLogin()
                /* 로그인 페이지 지정 */
                .loginPage("/login")
                .successHandler(new LoginSuccessHandler())
                /* 로그인 실패 핸들러 지정 */
                .failureHandler(new LoginFailHandler())
                .and()
                .logout()
                .logoutUrl("/logout")
                /* 로그아웃 페이지 지정 */
                .logoutSuccessUrl("/")
                .and()
                .exceptionHandling()
                /* 접근 권한 에러 페이지 지정 */
                .accessDeniedPage("/access-denied")
                .and()
                /* 다중 로그인 설정 */
                .sessionManagement().maximumSessions(1).maxSessionsPreventsLogin(false)
                /* 세션 고정 보호 */
                .and().sessionFixation().changeSessionId();
//                .and().csrf().csrfTokenRepository(csrfTokenRepository);
//                .and().csrf().disable();

        return http.build();
    }

    /* 정적 자원 허용 */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations()));
    }

    /* 비밀번호 인코더 */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

