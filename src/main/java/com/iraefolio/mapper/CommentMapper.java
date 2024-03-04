package com.iraefolio.mapper;

import com.iraefolio.domain.CommentEntity;
import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReCommentEntity;
import com.iraefolio.domain.dto.CommentDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    /* READ */
    List<CommentDTO> read(String category, String post_id);

    /* CREATE */
    boolean create(CommentEntity entity);

    /* DELETE */
    boolean delete(CommentEntity entity);

    /* CREATE RECOMMENT */
    boolean createReComment(ReCommentEntity entity);

    /* DELETE RECOMMENT */
    boolean deleteReComment(ReCommentEntity entity);

}
