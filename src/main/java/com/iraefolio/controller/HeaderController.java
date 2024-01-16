package com.iraefolio.controller;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.service.HeaderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "header Controller", description = "header Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/header")
@Controller
public class HeaderController {

    private final HeaderService service;

    /* DETAIL */
    @GetMapping("/{title}")
    public String getPostByTitle(@PathVariable String title, Model model) throws Exception {
        List<PostEntity> post = service.read();
        model.addAttribute("data", post);

        //{title}을 가지고 게시글 정보 불러오는 로직 수행
        PostEntity detail = service.readDetail(title);
        // 불러온 데이터를 JSP에 전달하는 로직 수행
        model.addAttribute("detail", detail);
        // JSP return
        return "postDetail";
    }
}
