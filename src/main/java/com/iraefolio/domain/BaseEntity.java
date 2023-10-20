package com.iraefolio.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;

@Data
public class BaseEntity {

//    @Schema(description = "CRUD 구분을 위한 flag", nullable = false)
    boolean isCreated;

//    @Schema(description = "CRUD 구분을 위한 flag", nullable = false)
    boolean isUpdated;

//    @Schema(description = "CRUD 구분을 위한 flag", nullable = false)
    boolean isDeleted;

//    @Schema(description = "pagination에 사용하는 변수", nullable = false)
    private int limit;

//    @Schema(description = "pagination에 사용하는 변수", nullable = false)
    private int page;

//    @Schema(description = "pagination에 사용하는 변수", nullable = false)
    private int offset;

    @JsonGetter
    public int getOffset(){
        if(limit <= 0)
            limit = 10;
        if(page <= 0)
            page = 1;

        return (page - 1) * limit;
    }
}
