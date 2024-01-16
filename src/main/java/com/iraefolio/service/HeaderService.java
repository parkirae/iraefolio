package com.iraefolio.service;

import com.iraefolio.domain.PostEntity;
import com.iraefolio.mapper.HeaderMapper;
import com.iraefolio.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class HeaderService {

    private final HeaderMapper mapper;

    /* READ */
    public List<PostEntity> read() throws Exception {
        List<PostEntity> list = mapper.read();
        return list;
    }

    /* READ DETAIL */
    public PostEntity readDetail(String title) throws Exception {
        PostEntity detail = mapper.readDetail(title);
        return detail;
    }

//    /* ReadCnt */
//    public Integer readCnt(PostEntity entity) throws Exception {
//        Integer cnt = mapper.readCnt(entity);
//        return cnt;
//    }
//
//    /* CREATE */
//    public void create(PostEntity entity) throws Exception {
//        mapper.create(entity);
//    }
//
//    /* UPDATE */
//    public void update(List<PostEntity> entity) throws Exception {
//
//        log.error(entity);
//
//        for (int i = 0; i < entity.size(); i++) {
//            PostEntity e = entity.get(i);
//
//            if (e.isUpdated()) mapper.update(e);
//
//            if (e.isDeleted()) mapper.delete(e);
//        }
//    }
}
