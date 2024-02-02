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
    public PostEntity readDetail(String category, String post_id) throws Exception {
        PostEntity detail = mapper.readDetail(category, post_id);
        return detail;
    }
}
