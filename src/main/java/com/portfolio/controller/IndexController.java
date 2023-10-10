package com.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Log4j2
@RequiredArgsConstructor
@Controller
public class IndexController {

    @GetMapping("/")
    public String index() throws Exception {
        return "index";
    }

    @GetMapping("/notice")
    public String notice() throws Exception {
        return "notice";
    }

    @GetMapping("/review")
    public String review() throws Exception {
        return "review";
    }
}
