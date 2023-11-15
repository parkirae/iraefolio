package com.iraefolio.domain.dto;

import com.iraefolio.domain.BaseEntity;
import com.iraefolio.domain.MemberAuthority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/* 회원 생성 시 사용하는 DTO
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberDTO extends BaseEntity {

    private Long memberId;
    private String username;
    private String password;
    private String name;
    private String authority;
}
