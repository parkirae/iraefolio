package com.iraefolio.controller;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.service.HeaderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    public ModelAndView login(@RequestParam(required = false) boolean error, @RequestParam(required = false) String exception) throws Exception {

        ModelAndView mav = new ModelAndView("login");
        List<PostEntity> post = service.read();
        mav.addObject("data", post);

        /* 로그인 실패 */
        if (error) {
            mav.addObject("error", true).addObject("exception", exception);
            return mav;
        }

        /* 로그인 페이지 접근 */
        return mav;
    }

    @Operation(summary = "logout", description = "로그아웃 합니다.")
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        return "redirect:/";
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
