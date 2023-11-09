package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {

    /* READ */
    List<Member> read(Member member);

    /* ReadCNT */
    Integer readCnt(Member member);
}
