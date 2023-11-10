package com.iraefolio.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberAuthority extends BaseEntity implements GrantedAuthority {

    private Long authorityId;
    private Long memberId;
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }
}
