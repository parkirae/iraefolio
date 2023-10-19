package com.portfolio.domain;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class ReviewEntity extends BaseEntity {

    @Schema(description = "데이터 구분하는 변수", nullable = false)
    private int SEQ;

    @Schema(description = "review 작성자", nullable = false)
    private String WRITER;

    @Schema(description = "review 제목", nullable = false)
    private String TITLE;

    @Schema(description = "review 내용", nullable = false)
//    @NotNull(message = "비어 있을 수 없습니다.")
//    @Length(min = 1, message = "test")
    private String CONTENT;

    @Schema(description = "생성일자", nullable = false)
    private LocalDate CREATE_DT;

    @Schema(description = "수정일자", nullable = false)
    private LocalDate UPDATE_DT;
}
