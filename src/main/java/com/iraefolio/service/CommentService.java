package com.iraefolio.service;

import com.iraefolio.domain.CommentEntity;
import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReCommentEntity;
import com.iraefolio.domain.dto.CommentDTO;
import com.iraefolio.mapper.CommentMapper;
import com.iraefolio.mapper.HeaderMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class CommentService {

    private final CommentMapper mapper;

    /* READ */
    public List<CommentDTO> read(String category, String post_id) throws Exception {
        List<CommentDTO> list = mapper.read(category, post_id);
        return list;
    }

    /* CREATE */
    public void create(CommentEntity entity) throws Exception {
        mapper.create(entity);
    }

    /* DELETE */
    public void delete(CommentEntity entity) throws Exception {
        mapper.delete(entity);
    }

    /* CREATE RECOMMENT */
    public void createReComment(ReCommentEntity entity) throws Exception {
        mapper.createReComment(entity);
    }

    /* DELETE RECOMMENT */
    public void deleteReComment(ReCommentEntity entity) throws Exception {
        mapper.deleteReComment(entity);
    }
}
