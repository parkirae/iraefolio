package com.portfolio.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;

@Data
public class BaseEntity {

    boolean isCreated;
    boolean isUpdated;
    boolean isDeleted;

    private int limit;
    private int page;
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
