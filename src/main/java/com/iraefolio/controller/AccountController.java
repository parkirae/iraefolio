package com.iraefolio.controller;

import com.iraefolio.domain.Member;
import com.iraefolio.service.AccountService;
import com.iraefolio.service.security.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Tag(name = "account Controller", description = "account Controller")
@Log4j2
@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService service;
    private final CustomUserDetailsService customUserDetailsService;

    /* 아이디 중복 체크 */
    @Operation(summary = "username 중복 체크", description = "username 중복을 체크합니다.")
    @PostMapping("/accountCheck")
    public Boolean accountCheck(@RequestBody Member member) throws Exception {
        Boolean result = service.accountCheck(member);
        return result;
    }

    /* 회원 가입 */
    @Operation(summary = "회원 가입", description = "회원 가입합니다.")
    @PostMapping("/create")
    public boolean create(@RequestBody Member member) throws Exception {

        /* 회원 가입 */
        boolean result = customUserDetailsService.create(member);

        if (!result) throw new Exception("회원 가입 오류");

        return result;
    }
}
