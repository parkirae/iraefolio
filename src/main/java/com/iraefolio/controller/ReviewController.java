package com.iraefolio.controller;

import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.service.ReviewService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

//@Tag(name = "review Controller", description = "review Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/review")
@PreAuthorize("hasRole('USER')")
@RestController
public class ReviewController {

    private final ReviewService service;

    /* PAGING */
//    @Operation(summary = "review paging", description = "/review로 이동합니다.")
    @GetMapping
    public ModelAndView review() {
        ModelAndView mav = new ModelAndView("review");
        return mav;
    }

    /* READ */
//    @Operation(summary = "READ review data", description = "/review의 데이터를 읽어옵니다.")
    @PostMapping
    public ResponseEntity read(@Valid @RequestBody ReviewEntity entity, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) throw new BindException(bindingResult);

        List<ReviewEntity> list = service.read(entity);

        return ResponseEntity.ok(list);
    }

    /* READONE */
//    @Operation(summary = "READ review data by seq", description = "/review의 데이터를 한 개 읽어옵니다.")
    @GetMapping("/reviewDetail")
    public ModelAndView read(Integer seq) throws Exception {
        ReviewEntity data = service.readOne(seq);
        ModelAndView mav = new ModelAndView("/reviewDetail");
        mav.addObject("data", data);
        return mav;
    }

    /* CNT */
//    @Operation(summary = "READ review cnt", description = "/review의 데이터 개수를 읽어옵니다.")
    @PostMapping("/cnt")
     public Integer readCnt(ReviewEntity entity) throws Exception {
        Integer cnt = service.readCnt(entity);
        return cnt;
    }

    /* CREATE */
//    @Operation(summary = "CREATE review", description = "새로운 review를 작성합니다.")
    @PutMapping
    public void create(@RequestBody ReviewEntity entity) throws Exception {
        service.create(entity);
    }

    /* UPDATE */
//    @Operation(summary = "UPDATE review", description = "review를 수정합니다.")
    @PatchMapping
    public void update(@RequestBody List<ReviewEntity> entity) throws Exception {
        service.update(entity);
    }
}
