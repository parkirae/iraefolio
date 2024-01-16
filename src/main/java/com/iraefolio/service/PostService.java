package com.iraefolio.service;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.mapper.PostMapper;
import com.iraefolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class PostService {

    private final PostMapper mapper;

    /* READ */
    public List<PostEntity> read(PostEntity entity) throws Exception {
        List<PostEntity> list = mapper.read(entity);
        return list;
    }

    /* ReadCnt */
    public Integer readCnt(PostEntity entity) throws Exception {
        Integer cnt = mapper.readCnt(entity);
        return cnt;
    }

    /* CREATE */
    public void create(PostEntity entity) throws Exception {
        mapper.create(entity);
    }

    /* UPDATE */
    public void update(List<PostEntity> entity) throws Exception {

        for (int i = 0; i < entity.size(); i++) {
            PostEntity e = entity.get(i);

            if (e.isUpdated()) mapper.update(e);

            if (e.isDeleted()) mapper.delete(e);
        }
    }
}
