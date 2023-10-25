package com.iraefolio.service.security;

import com.iraefolio.domain.Member;
import com.iraefolio.mapper.AccountMapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountMapper accountMapper;

    /* 회원 가입 */
    public boolean create(Member member){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        member.setUsername(member.getUsername());
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setName(member.getName());
        boolean result = accountMapper.create(member);

        return result;
    }

    /* 로그인 */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Member> result = accountMapper.findByUserName(username);

        if (result.isEmpty()) throw new UsernameNotFoundException("not found");

        Member member = result.get();

        return member;
    }
}
