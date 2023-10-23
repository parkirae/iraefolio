package com.iraefolio.mapper;

import com.iraefolio.domain.AccountEntity;
import com.iraefolio.domain.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {

    Boolean accountCheck(AccountEntity entity);

    boolean create(AccountEntity entity);
}