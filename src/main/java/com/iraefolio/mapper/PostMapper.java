package com.iraefolio.mapper;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    /* READ */
    List<PostEntity> read(PostEntity entity);

    /* ReadCNT */
    Integer readCnt(PostEntity entity);

    /* CREATE */
    boolean create(PostEntity entity);

    /* UPDATE */
    boolean update(PostEntity entity);

    /* DELETE */
    boolean delete(PostEntity entity);
}
