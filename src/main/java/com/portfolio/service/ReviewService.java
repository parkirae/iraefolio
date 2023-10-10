package com.portfolio.service;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.domain.TestEntity;
import com.portfolio.mapper.ReviewMapper;
import com.portfolio.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewMapper mapper;

    // read
    public List<ReviewEntity> list() throws Exception {
        List<ReviewEntity> list = mapper.read();
        return list;
    }
}
