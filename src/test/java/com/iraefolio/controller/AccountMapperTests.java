package com.iraefolio.controller;

import com.iraefolio.mapper.MemberMapper;
import com.iraefolio.service.security.CustomUserDetailsService;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.security.crypto.password.PasswordEncoder;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@MybatisTest
public class AccountMapperTests {

    @Autowired
    private MemberMapper mapper;
    private CustomUserDetailsService userDetailsService;
    private PasswordEncoder passwordEncoder;

//    @Test
//    public void userDetailsServiceTest() {
//        AccountEntity entity = AccountEntity.builder()
//                .USER_ID("iraeirae")
//                .USER_PW(passwordEncoder.encode("irae"))
//                .USER_NAME("박이레")
//                .build();
//
//    }

//    @Test
//    public void accountMapperTest() {
//
//        AccountEntity entity = AccountEntity.builder().USER_ID("irae").build();
//
//        Boolean result = mapper.accountCheck(entity);
//
//        Assertions.assertEquals("1", "1");
//    }
}
