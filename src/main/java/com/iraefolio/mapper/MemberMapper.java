package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;
import java.util.Set;

@Mapper
public interface MemberMapper {

    /* 아이디 중복 체크 */
    Boolean memberCheck(Member member);

    /* 회원 가입 */
    void create(Member member);

    /* 회원 생성 */
    void createUser(MemberDTO memberDTO);

    /* 회원 가입 시 권한 부여 */
    void grantInitialAuthority(MemberAuthority memberAuthority);

    /* 회원 생성 시 권한 부여 */
    void grantAuthority(MemberAuthority memberAuthority);

    /* 로그인 시 사용 */
    Optional<Member> findByUserName(String username);

    /* 회원 생성 시 사용 */
    Optional<MemberDTO> findUserName(String username);

    /* 로그인 성공 시 권한 정보 추가 */
    Set<MemberAuthority> searchAuthority(Long memberId);
}