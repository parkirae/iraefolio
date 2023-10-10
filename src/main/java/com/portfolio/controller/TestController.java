package com.portfolio.controller;

import com.portfolio.domain.TestEntity;
import com.portfolio.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Controller
public class TestController {

    private final TestService service;

    @GetMapping("/test")
    public String test(Model model) throws Exception {
        List<TestEntity> list = service.read();
        model.addAttribute("list", list);
        return "test";
    }
}
