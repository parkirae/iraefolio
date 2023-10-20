package com.iraefolio.domain;

import lombok.Data;

@Data
public class ResultEntity<T> {

//    @Schema(description = "서버로부터 반환된 데이터", nullable = false)
    T data;
}
