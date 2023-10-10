package com.portfolio.domain;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReviewEntity {

    private int ID;
    private String WRITER;
    private String CONTENT;
    private LocalDate CREATE_DT;
    private LocalDate UPDATE_DT;
}
