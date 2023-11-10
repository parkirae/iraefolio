package com.iraefolio.domain.dto;

import com.iraefolio.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* 사용자 -> 관리자
   관리자 -> 사용자
   권한 변경 시 사용하는 DTO
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberAuthorityDTO extends BaseEntity {

    private Long memberId;
    private String authorities;
}
