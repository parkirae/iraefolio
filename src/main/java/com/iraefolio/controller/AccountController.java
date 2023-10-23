package com.iraefolio.controller;

import com.iraefolio.domain.AccountEntity;
import com.iraefolio.service.AccountService;
import com.iraefolio.service.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Log4j2
@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService service;
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/accountCheck")
    public Boolean accountCheck(@RequestBody AccountEntity entity) throws Exception {
        Boolean result = service.accountCheck(entity);
        return result;
    }

    @PostMapping("/create")
    public boolean create(@RequestBody AccountEntity entity, HttpServletRequest request ) throws Exception {
        log.error(request);
        boolean result = customUserDetailsService.create(entity);
        return result;
    }
}
