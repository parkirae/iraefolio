package com.portfolio.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class ReviewEntity extends BaseEntity {

    private int SEQ;

    private String WRITER;

    @NotNull
    private String CONTENT;

    private LocalDate CREATE_DT;

    @FutureOrPresent
    private LocalDate UPDATE_DT;
}
