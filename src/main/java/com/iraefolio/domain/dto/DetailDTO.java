package com.iraefolio.domain.dto;

import com.iraefolio.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DetailDTO extends BaseEntity {

    private String POST_ID;
    private String CATEGORY;
}
