package com.portfolio.service;

import com.portfolio.domain.ReviewEntity;
import com.portfolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewMapper mapper;

    /* READ */
    public List<ReviewEntity> read(ReviewEntity entity) throws Exception {
        List<ReviewEntity> list = mapper.read(entity);
        return list;
    }

    /* ReadCnt */
    public Integer readCnt(@RequestBody ReviewEntity entity) throws Exception {
        Integer cnt = mapper.readCnt(entity);
        return cnt;
    }

    /* CREATE */
    public void create(ReviewEntity entity) throws Exception {
        mapper.create(entity);
    }

    /* UPDATE */
    public void update(ReviewEntity entity) throws Exception {
        mapper.update(entity);
    }

    /* DELETE */
    public void delete(ReviewEntity entity) throws Exception {
        mapper.delete(entity);
    }
}
