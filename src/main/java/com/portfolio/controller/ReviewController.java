package com.portfolio.controller;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Tag(name = "review Controller", description = "review Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/review")
@RestController
public class ReviewController {

    private final ReviewService service;

    /* PAGING */
    @Operation(summary = "review paging", description = "/review로 이동합니다.")
    @GetMapping
    public ModelAndView review() {
        ModelAndView mav = new ModelAndView("review");
        return mav;
    }

    /* READ */
    @Operation(summary = "READ review data", description = "/review의 데이터를 읽어옵니다.")
    @PostMapping
    public ResponseEntity read(@Valid ReviewEntity entity, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            throw new ValidationException("요청 파라미터가 적절하지 않습니다.");
        }

        List<ReviewEntity> list = service.read(entity);

        return ResponseEntity.ok(list);
    }

    /* READONE */
    @GetMapping("/reviewDetail")
    public ModelAndView read(Integer seq) throws Exception {
        ReviewEntity data = service.readOne(seq);
        ModelAndView mav = new ModelAndView("/reviewDetail");
        mav.addObject("data", data);
        return mav;
    }
//    @Operation(summary = "READ review data by seq", description = "/review의 데이터를 한 개 읽어옵니다.")
//    @PostMapping("/{seq}")
//    public ModelAndView readOne(@PathVariable("seq") int seq) throws Exception {
//
//
//        log.error(seq);
//        ModelAndView mav = new ModelAndView("reviewDetail");
//
//        ReviewEntity data = service.readOne(seq);
//
//        mav.addObject(data);
//
//        return mav;
//    }
//
//    @GetMapping("/reviewDetail")
//    public ModelAndView reviewDetail(ReviewEntity entity) throws Exception {
//        ModelAndView mav = new ModelAndView("reviewDetail");
//
//        return mav;
//    }

    /* CNT */
    @Operation(summary = "READ review cnt", description = "/review의 데이터 개수를 읽어옵니다.")
    @PostMapping("/cnt")
     public Integer readCnt(ReviewEntity entity) throws Exception {
        Integer cnt = service.readCnt(entity);
        return cnt;
    }

    /* CREATE */
    @Operation(summary = "CREATE review", description = "새로운 review를 작성합니다.")
    @PutMapping
    public void create(@RequestBody ReviewEntity entity) throws Exception {
        service.create(entity);
    }

    /* UPDATE */
    @Operation(summary = "UPDATE review", description = "review를 수정합니다.")
    @PatchMapping
    public void update(@RequestBody List<ReviewEntity> entity) throws Exception {
        service.update(entity);
    }
}
