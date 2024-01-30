package com.iraefolio.mapper;

import com.iraefolio.domain.PostEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HeaderMapper {

    /* READ */
    List<PostEntity> read();

    /* READ DETAIL */
    PostEntity readDetail(String title);

}
