package com.portfolio.service;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewMapper mapper;

    // READ
    public List<ReviewEntity> list() throws Exception {
        List<ReviewEntity> list = mapper.read();
        return list;
    }

    // CREATE
    public void create(ReviewEntity entity) throws Exception {
        mapper.create(entity);
    }

    // UPDATE
    public void update(ReviewEntity entity) throws Exception {
        mapper.update(entity);
    }

    // DELETE
    public void delete(ReviewEntity entity) throws Exception {
        mapper.delete(entity);
    }
}
