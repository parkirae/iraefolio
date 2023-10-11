package com.portfolio.mapper;

import com.portfolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    List<ReviewEntity> read();

    boolean create(ReviewEntity entity);

    boolean update(ReviewEntity entity);

    boolean delete(ReviewEntity entity);
}
