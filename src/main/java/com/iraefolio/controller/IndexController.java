package com.iraefolio.controller;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.service.HeaderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Controller
public class IndexController {

    private final HeaderService service;

    @Operation(summary = "index paging", description = "/index로 이동합니다.")
    @GetMapping("/")
    public String index(Model model) throws Exception {
        List<PostEntity> post = service.read();
        model.addAttribute("data", post);
        return "index";
    }

    @Operation(summary = "login", description = "/login로 이동하거나 login 실패 시 안내 문구를 출력합니다.")
    @GetMapping("/login")
    @PreAuthorize("isAnonymous()")
    public ModelAndView login(@RequestParam(required = false) boolean error, @RequestParam(required = false) String exception) {

        ModelAndView mav = new ModelAndView("login");

        /* 로그인 실패 */
        if (error) {
            mav.addObject("error", true).addObject("exception", exception);
            return mav;
        }

        /* 로그인 페이지 접근 */
        return mav;
    }

    @Operation(summary = "signUp paging", description = "/signUp로 이동합니다.")
    @GetMapping("/signUp")
    @PreAuthorize("isAnonymous()")
    public String signUp(Model model) throws Exception {
        List<PostEntity> post = service.read();
        model.addAttribute("data", post);
        return "signUp";
    }
}
