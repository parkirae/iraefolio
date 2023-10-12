package com.portfolio.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.time.LocalDate;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class ReviewEntity extends PagingEntity {

    private int SEQ;
    private String WRITER;
    private String CONTENT;
    private LocalDate CREATE_DT;
    private LocalDate UPDATE_DT;
}
