package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface AccountMapper {

    /* 아이디 중복 체크 */
    Boolean accountCheck(Member member);

    /* 회원 가입 */
    boolean create(Member member);

    /* 로그인 시 사용 */
    Optional<Member> findByUserName(String username);
}