package com.iraefolio.service.security;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.dto.MemberDTO;
import com.iraefolio.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberMapper memberMapper;

    /* 회원 가입 */
    public boolean create(Member member) {
        try {
            /* 비밀번호 암호화 */
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            /* TB_MEMBER에 insert */
            member.setUsername(member.getUsername());
            member.setPassword(passwordEncoder.encode(member.getPassword()));
            member.setName(member.getName());
            memberMapper.create(member);

            /* TB_MEMBER에 insert된 member 조회 */
            Optional<Member> result = memberMapper.findByUserName(member.getUsername());

            /* TB_MEMBER_AUTHORITY에 insert
            회원 가입 시 ROLE_USER로 authority 설정 */
            MemberAuthority authority = new MemberAuthority();
            authority.setMemberId(result.get().getMemberId());
            authority.setAuthority("ROLE_USER");

            memberMapper.grantInitialAuthority(authority);

            return true;
        } catch (Exception e) {
            log.error(e);
            return false;
        }
    }

    /* 회원 생성 */
    public boolean createUser(MemberDTO memberDTO) {

        try {
            /* 비밀번호 암호화 */
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            /* TB_MEMBER에 insert */
            memberDTO.setUsername(memberDTO.getUsername());
            memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
            memberDTO.setName(memberDTO.getName());
            memberMapper.createUser(memberDTO);

            /* TB_MEMBER에 insert된 member 조회 */
            Optional<MemberDTO> result = memberMapper.findUserName(memberDTO.getUsername());

            /* TB_MEMBER_AUTHORITY에 insert
            회원 가입 시 ROLE_USER로 authority 설정 */
            MemberAuthority authority = new MemberAuthority();
            authority.setMemberId(result.get().getMemberId());

            /* 관리자인 경우 두 번 권한 부여 */
            if (memberDTO.getAuthority().equals("ROLE_ADMIN")) {
                authority.setAuthority(memberDTO.getAuthority());
                memberMapper.grantAuthority(authority);
                authority.setAuthority("ROLE_USER");
            } else {
                authority.setAuthority(memberDTO.getAuthority());
            }
            memberMapper.grantAuthority(authority);

            return true;
        } catch (Exception e) {
            log.error(e);
            return false;
        }
    }

    /* 로그인 */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        /* 아이디 조회 */
        Optional<Member> result = memberMapper.findByUserName(username);

        /* 아이디 없을 경우 Exception 발생 */
        if (result.isEmpty()) throw new UsernameNotFoundException("User not found");

        /* Member 객체로 파싱 */
        Member member = result.get();
        /* 권한 정보 추가 */
        Set<MemberAuthority> authority = memberMapper.searchAuthority(member.getMemberId());
        member.setAuthorities(authority);

        return member;
    }
}
