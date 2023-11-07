package com.iraefolio.controller;

import com.iraefolio.domain.Member;
import com.iraefolio.service.MemberService;
import com.iraefolio.service.security.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "member Controller", description = "member Controller")
@Log4j2
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;
    private final CustomUserDetailsService customUserDetailsService;

    /* 아이디 중복 체크 */
    @Operation(summary = "username 중복 체크", description = "username 중복을 체크합니다.")
    @PostMapping("/accountCheck")
    public Boolean accountCheck(@RequestBody Member member) throws Exception {
        Boolean result = memberService.accountCheck(member);
        return result;
    }

    /* 회원 가입 */
    @Operation(summary = "회원 가입", description = "회원 가입합니다.")
    @PostMapping("/create")
    public void create(@RequestBody Member member) throws Exception {
        /* 회원 가입 */
        customUserDetailsService.create(member);
    }
}
