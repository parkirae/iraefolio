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

//    /* ReadCNT */
//    Integer readCnt(PostEntity entity);
//
//    /* CREATE */
//    boolean create(PostEntity entity);
//
//    /* UPDATE */
//    boolean update(PostEntity entity);
//
//    /* DELETE */
//    boolean delete(PostEntity entity);
}
