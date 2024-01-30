package com.iraefolio.mapper;

import com.iraefolio.domain.CommentEntity;
import com.iraefolio.domain.PostEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    /* READ */
    List<CommentEntity> read(int postId);

    /* CREATE */
    boolean create(CommentEntity entity);

}
