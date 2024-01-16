package com.iraefolio.controller;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.service.HeaderService;
import com.iraefolio.service.PostService;
import com.iraefolio.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "post Controller", description = "post Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/post")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
public class PostController {

    private final PostService service;
    private final HeaderService headerService;

    /* PAGING */
    @Operation(summary = "post paging", description = "/post로 이동합니다.")
    @GetMapping
    public ModelAndView post() throws Exception {
        ModelAndView mav = new ModelAndView("post");
        List<PostEntity> post = headerService.read();
        mav.addObject("data", post);
        return mav;
    }

    /* READ */
    @Operation(summary = "READ post data", description = "/post의 데이터를 읽어옵니다.")
    @PostMapping
    public ResponseEntity read(@RequestBody PostEntity entity, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) throw new BindException(bindingResult);

        List<PostEntity> list = service.read(entity);

        return ResponseEntity.ok(list);
    }

    /* CREATE */
    @Operation(summary = "CREATE post", description = "새로운 post를 작성합니다.")
    @PutMapping
    public void create(@Valid @RequestBody PostEntity entity) throws Exception {
        service.create(entity);
    }

    /* UPDATE */
    @Operation(summary = "UPDATE post", description = "post를 수정합니다.")
    @PatchMapping
    public void update(@Valid @RequestBody List<PostEntity> entity) throws Exception {
        service.update(entity);
    }

    /* CNT */
    @Operation(summary = "READ post cnt", description = "post의 데이터 개수를 읽어옵니다.")
    @PostMapping("/cnt")
     public Integer readCnt(PostEntity entity) throws Exception {
        Integer cnt = service.readCnt(entity);
        return cnt;
    }
}
