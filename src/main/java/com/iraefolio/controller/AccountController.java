package com.iraefolio.controller;

import com.iraefolio.domain.Member;
import com.iraefolio.service.AccountService;
import com.iraefolio.service.security.CustomUserDetailsService;
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

@Log4j2
@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService service;
    private final CustomUserDetailsService customUserDetailsService;

    /* 아이디 중복 체크 */
    @PostMapping("/accountCheck")
    public Boolean accountCheck(@RequestBody Member member) throws Exception {
        Boolean result = service.accountCheck(member);
        return result;
    }

    /* 회원 가입 */
    @PostMapping("/create")
    public boolean create(@RequestBody Member member) throws Exception {

        /* 회원 가입 */
        boolean result = customUserDetailsService.create(member);

        if (!result) throw new Exception("회원 가입 오류");

        /* 회원 가입 후 자동 로그인 */
        service.login(member);

        return result;
    }
}
