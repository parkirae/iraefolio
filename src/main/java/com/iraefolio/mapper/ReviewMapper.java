package com.iraefolio.mapper;

import com.iraefolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    /* READ */
    List<ReviewEntity> read(ReviewEntity entity);

    /* READONE */
    ReviewEntity readOne(Integer seq);

    /* ReadCNT */
    Integer readCnt(ReviewEntity entity);

    /* CREATE */
    boolean create(ReviewEntity entity);

    /* UPDATE */
    boolean update(ReviewEntity entity);

    /* DELETE */
    boolean delete(ReviewEntity entity);
}
