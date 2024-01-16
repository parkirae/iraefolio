package com.iraefolio.controller;

import com.iraefolio.domain.Member;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    @Operation(summary = "회원 생성", description = "회원을 생성합니다.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create-user")
    public void createUser(MemberDTO memberDTO) throws Exception {
        /* 회원 생성 */
        customUserDetailsService.createUser(memberDTO);
    }
}
