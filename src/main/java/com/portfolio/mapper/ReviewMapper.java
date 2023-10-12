package com.portfolio.mapper;

import com.portfolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    /* READ */
    List<ReviewEntity> read(ReviewEntity entity);

    /* READCNT */
    Integer readCnt();

    /* CREATE */
    boolean create(ReviewEntity entity);

    /* UPDATE */
    boolean update(ReviewEntity entity);

    /* DELTE */
    boolean delete(ReviewEntity entity);
}
