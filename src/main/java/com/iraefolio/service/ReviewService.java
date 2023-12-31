package com.iraefolio.service;

import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class ReviewService {

    private final ReviewMapper mapper;

    /* READ */
    public List<ReviewEntity> read(ReviewEntity entity) throws Exception {
        List<ReviewEntity> list = mapper.read(entity);
        return list;
    }

    /* ReadCnt */
    public Integer readCnt(ReviewEntity entity) throws Exception {
        Integer cnt = mapper.readCnt(entity);
        return cnt;
    }

    /* CREATE */
    public void create(ReviewEntity entity) throws Exception {
        mapper.create(entity);
    }

    /* UPDATE */
    public void update(List<ReviewEntity> entity) throws Exception {

        log.error(entity);

        for (int i = 0; i < entity.size(); i++) {
            ReviewEntity e = entity.get(i);

            if (e.isUpdated()) mapper.update(e);

            if (e.isDeleted()) mapper.delete(e);
        }
    }
}
