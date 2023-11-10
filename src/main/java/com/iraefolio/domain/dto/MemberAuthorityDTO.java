package com.iraefolio.domain.dto;

import com.iraefolio.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberAuthorityDTO extends BaseEntity {

    private Long memberId;
    private String authorities;
}
