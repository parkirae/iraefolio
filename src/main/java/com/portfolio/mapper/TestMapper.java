package com.portfolio.mapper;

import com.portfolio.domain.TestEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {

    List<TestEntity> read();
}
