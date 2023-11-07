package com.iraefolio.service.security;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberMapper memberMapper;

    /* 회원 가입 */
    public void create(Member member){
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

        /* TB_MEMBER_AUTHORITY에 insert된 정보를
           TB_MEMBER에 추가 */
        Set<MemberAuthority> authorities = new HashSet<>();
        authorities.add(authority);
        member.setAuthorities(authorities);
    }

    /* 로그인 */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Member> result = memberMapper.findByUserName(username);

        if (result.isEmpty()) throw new UsernameNotFoundException("not found");

        Member member = result.get();

        return member;
    }
}
