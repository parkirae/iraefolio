package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;
import java.util.Set;

@Mapper
public interface MemberMapper {

    /* 아이디 중복 체크 */
    Boolean accountCheck(Member member);

    /* 회원 가입 */
    void create(Member member);

    /* 회원 가입 시 권한 부여 */
    void grantInitialAuthority(MemberAuthority memberAuthority);

    /* 로그인 시 사용 */
    Optional<Member> findByUserName(String username);

    /* 로그인 성공 시 권한 정보 추가 */
    Set<MemberAuthority> searchAuthority(Long memberId);
}