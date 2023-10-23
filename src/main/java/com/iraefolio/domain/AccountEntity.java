package com.iraefolio.domain;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@Data
public class AccountEntity extends BaseEntity {

    private int USER_NO;

    private String USER_ID;

    private String USER_PW;

    private String USER_NAME;

    private String USER_AUTH;
}
