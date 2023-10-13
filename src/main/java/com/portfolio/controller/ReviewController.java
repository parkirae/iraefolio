package com.portfolio.controller;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RequestMapping("/review")
@RestController
public class ReviewController {

    private final ReviewService service;

    /* PAGING */
    @GetMapping
    public ModelAndView review() {
        ModelAndView mav = new ModelAndView("review");
        return mav;
    }

    /* READ */
    @PostMapping
    public List<ReviewEntity> read(@RequestBody ReviewEntity entity) throws Exception {
        List<ReviewEntity> list = service.read(entity);
        return list;
    }

    /* CNT */
    @PostMapping("/cnt")
     public Integer readCnt(@RequestBody ReviewEntity entity) throws Exception {
        Integer cnt = service.readCnt(entity);
        return cnt;
    }

    /* CREATE */
    @PutMapping
    public void create(@RequestBody ReviewEntity entity) throws Exception {
        service.create(entity);
    }

    /* UPDATE */
    @PatchMapping
    public void update(@RequestBody List<ReviewEntity> entity) throws Exception {
        service.update(entity);
    }

    /* DELETE */
    @DeleteMapping
    public void delete(@RequestBody ReviewEntity entity) throws Exception {
        service.delete(entity);
    }
}
