package com.iraefolio.service;

import com.iraefolio.domain.AccountEntity;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.mapper.AccountMapper;
import com.iraefolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountMapper mapper;

    public Boolean accountCheck(AccountEntity entity) throws Exception {
        Boolean result = mapper.accountCheck(entity);
        return result;
    }
}
