package com.iraefolio.controller;

import com.iraefolio.domain.CommentEntity;
import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReCommentEntity;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.domain.dto.CommentDTO;
import com.iraefolio.domain.dto.DetailDTO;
import com.iraefolio.service.CommentService;
import com.iraefolio.service.HeaderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.ibatis.annotations.Delete;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "header Controller", description = "header Controller")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/header")
@Controller
public class HeaderController {

    private final HeaderService service;
    private final CommentService commentService;

    /* DETAIL */
    @GetMapping("/{category}/{post_id}")
    public String getPostByTitle(@PathVariable String category, @PathVariable String post_id, Model model) throws Exception {
        List<PostEntity> post = service.read();
        model.addAttribute("data", post);

        // 게시글 정보 불러오는 로직 수행
        PostEntity detail = service.readDetail(category, post_id);
        // 불러온 데이터를 JSP에 전달하는 로직 수행
        model.addAttribute("detail", detail);

        // 댓글 정보 불러오는 로직 수행
        List<CommentDTO> comment = commentService.read(category, post_id);
        // 불러온 데이터를 JSP에 전달하는 로직 수행
        model.addAttribute("comment", comment);

        // JSP return
        return "postDetail";
    }

    /* READ */
    @Operation(summary = "READ comment data", description = "comment의 데이터를 읽어옵니다.")
    @PutMapping
    public ResponseEntity read(@RequestBody DetailDTO detailDTO) throws Exception {

//        if (bindingResult.hasErrors()) throw new BindException(bindingResult);

        List<CommentDTO> commentList = commentService.read(detailDTO.getCATEGORY(), detailDTO.getPOST_ID());

        return ResponseEntity.ok(commentList);
    }

    /* CREATE */
    @Operation(summary = "CREATE comment", description = "새로운 comment를 작성합니다.")
    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CommentEntity entity) throws Exception {
        commentService.create(entity);
        return ResponseEntity.ok().build();
    }

    /* DELETE */
    @Operation(summary = "DELETE comment", description = "comment를 삭제합니다.")
    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody CommentEntity entity) throws Exception {
        commentService.delete(entity);
        return ResponseEntity.ok().build();
    }

    /* CREATE RECOMMENT */
    @Operation(summary = "CREATE reComment", description = "새로운 reComment를 작성합니다.")
    @PostMapping("/create")
    public ResponseEntity<Void> create(@Valid @RequestBody ReCommentEntity entity) throws Exception {
        commentService.createReComment(entity);
        return ResponseEntity.ok().build();
    }

    /* DELETE RECOMMENT */
    @Operation(summary = "DELETE reComment", description = "reComment를 삭제합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody ReCommentEntity entity) throws Exception {
        commentService.deleteReComment(entity);
        return ResponseEntity.ok().build();
    }

}
