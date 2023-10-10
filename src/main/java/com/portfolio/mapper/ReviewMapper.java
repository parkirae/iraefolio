package com.portfolio.mapper;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.domain.TestEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    List<ReviewEntity> read();
}
