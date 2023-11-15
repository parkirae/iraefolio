package com.iraefolio.service;

import com.iraefolio.domain.Member;
import com.iraefolio.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Log4j2
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberMapper mapper;

    /* 아이디 중복 체크 */
    public Boolean memberCheck(Member member) throws Exception {
        Boolean result = mapper.memberCheck(member);
        return result;
    }
}
