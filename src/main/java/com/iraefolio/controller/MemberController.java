package com.iraefolio.controller;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.dto.MemberDTO;
import com.iraefolio.service.MemberService;
import com.iraefolio.service.security.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Tag(name = "member Controller", description = "member Controller")
@Log4j2
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    private final CustomUserDetailsService customUserDetailsService;

    /* 아이디 중복 체크 */
    @Operation(summary = "username 중복 체크", description = "username 중복을 체크합니다.")
    @PostMapping("/memberCheck")
    public Boolean memberCheck(@RequestBody Member member) throws Exception {
        Boolean result = memberService.memberCheck(member);
        return result;
    }

    /* 회원 가입 후 자동 로그인 */
    @Operation(summary = "회원 가입", description = "회원 가입 후 로그인합니다.")
    @PostMapping("/create")
    public void create(@RequestParam String username, @RequestParam String password, @RequestParam String name, HttpServletResponse response) throws Exception {
        Member member = Member.builder()
                        .username(username)
                        .password(password)
                        .name(name)
                        .build();

        /* 회원 가입 */
        boolean result = customUserDetailsService.create(member);

        /* 회원 가입 성공 시 자동 로그인 */
        if (result) {
            /* 자동 로그인 */
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(member.getUsername());
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, userDetails.getPassword(), userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            response.sendRedirect("/");
        } else {
            response.sendRedirect("/signUp");
        }
    }

    /* 회원 생성 */
//    @Operation(summary = "회원 생성", description = "회원을 생성합니다.")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @PostMapping("/create-user")
//    public void createUser(@RequestBody MemberDTO memberDTO, HttpServletResponse response) throws Exception {
//        /* 회원 생성 */
//        boolean result = customUserDetailsService.createUser(memberDTO);
//
//        if (result) {
//            log.error("성공");
//            response.sendRedirect("/");
//        } else {
//            log.error("실패");
//        }
//    }

    @Operation(summary = "회원 생성", description = "회원을 생성합니다.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create-user")
    public void createUser(@RequestParam String username, @RequestParam String password, @RequestParam String name, @RequestParam String authority, HttpServletResponse response) throws Exception {
        // 회원 생성에 필요한 객체 생성

        // 객체 Service로 전달

        List<Object> authority2 = new ArrayList();
        authority2.add(authority);

        MemberDTO memberDTO = MemberDTO.builder()
                .username(username)
                .password(password)
                .name(name)
                .authorities(authority2)
                .build();

        /* 회원 생성 */
        boolean result = customUserDetailsService.createUser(memberDTO);

        if (result) {
            log.error("성공");
            response.sendRedirect("/");
        } else {
            log.error("실패");
        }
    }
}
