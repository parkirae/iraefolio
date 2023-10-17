package com.portfolio.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ResultEntity<T> {

    @Schema(description = "서버로부터 반환된 데이터", nullable = false)
    T data;
}
