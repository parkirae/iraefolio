package com.iraefolio.service.security;

import com.iraefolio.domain.AccountEntity;
import com.iraefolio.mapper.AccountMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AccountMapper accountMapper;
    @Transactional
    public boolean create(AccountEntity entity){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        entity.setUSER_ID(entity.getUSER_ID());
        entity.setUSER_PW(passwordEncoder.encode(entity.getUSER_PW()));
        entity.setUSER_NAME(entity.getUSER_NAME());
        boolean result = accountMapper.create(entity);
        return result;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDetails userDetails = User.builder().username("test")
                .password(passwordEncoder.encode("test"))
                .authorities("ROLE_USER")
                .build();

        return userDetails;
    }
}
