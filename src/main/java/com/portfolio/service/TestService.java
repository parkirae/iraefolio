package com.portfolio.service;

import com.portfolio.domain.TestEntity;
import com.portfolio.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TestService {

    private final TestMapper testMapper;

    // read
    public List<TestEntity> read() throws Exception {
        List<TestEntity> test = testMapper.read();
        return test;
    }
}
