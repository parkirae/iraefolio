package com.iraefolio.service;

import com.iraefolio.domain.Member;
import com.iraefolio.mapper.AccountMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountMapper mapper;

    /* 아이디 중복 체크 */
    public Boolean accountCheck(Member member) throws Exception {
        Boolean result = mapper.accountCheck(member);
        return result;
    }

    /* 회원 가입 후 자동 로그인 */
    public void login(Member member) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                member.getUsername(),
                member.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
        SecurityContextHolder.getContext().setAuthentication(token);
    }
}
