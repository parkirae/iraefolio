package com.portfolio.controller;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RequestMapping("/review")
@Controller
public class ReviewController {

    private final ReviewService service;

    @GetMapping
    public String review() {
        return "review";
    }
}
