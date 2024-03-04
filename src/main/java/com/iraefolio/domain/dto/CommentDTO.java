package com.iraefolio.domain.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.iraefolio.domain.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class CommentDTO extends BaseEntity implements Serializable  {

    private String TYPE;

    private int RECOMMENT_ID;

    private int COMMENT_ID;

    private int POST_ID;

    private int MEMBER_ID;

    private String CATEGORY;

    private String USERNAME;

    private String WRITER;

    private String CONTENT;

    private LocalDateTime CREATE_DT;

    private LocalDateTime UPDATE_DT;
}
