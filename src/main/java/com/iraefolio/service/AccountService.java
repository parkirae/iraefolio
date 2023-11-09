package com.iraefolio.service;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.mapper.AccountMapper;
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
public class AccountService {

    private final AccountMapper mapper;

    /* READ */
    public List<Member> read(Member member) throws Exception {
        List<Member> list = mapper.read(member);
        return list;
    }

    /* ReadCnt */
    public Integer readCnt(Member member) throws Exception {
        Integer cnt = mapper.readCnt(member);
        return cnt;
    }
}