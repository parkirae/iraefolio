package com.iraefolio.controller;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.domain.dto.MemberAuthorityDTO;
import com.iraefolio.service.AccountService;
import com.iraefolio.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "account Controller", description = "account Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/account")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
public class AccountController {

    private final AccountService service;

    /* PAGING */
    @Operation(summary = "account paging", description = "/account로 이동합니다.")
    @GetMapping
    public ModelAndView review() {
        ModelAndView mav = new ModelAndView("account");
        return mav;
    }

    /* READ */
    @Operation(summary = "READ account data", description = "/account의 데이터를 읽어옵니다.")
    @PostMapping
    public ResponseEntity read(@RequestBody Member member, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) throw new BindException(bindingResult);

        List<Member> list = service.read(member);

        return ResponseEntity.ok(list);
    }

    /* UPDATE */
    @Operation(summary = "UPDATE account", description = "account를 수정합니다.")
    @PatchMapping
    public void update(@RequestBody List<MemberAuthorityDTO> memberAuthority) throws Exception {
        service.update(memberAuthority);
    }

    /* CNT */
    @Operation(summary = "READ member cnt", description = "member의 데이터 개수를 읽어옵니다.")
    @PostMapping("/cnt")
    public Integer readCnt(Member member) throws Exception {
        Integer cnt = service.readCnt(member);
        return cnt;
    }
}
