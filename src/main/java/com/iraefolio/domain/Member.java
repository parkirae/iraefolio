package com.iraefolio.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "roleSet")
public class Member implements UserDetails {

    private String username;
    private String password;
    private String name;
    private boolean del;
    private boolean social;

    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    public void changePassword(String password) {
        this.password = password; // 이전의 비밀번호를 새 비밀번호로 변경
    }

    public void changeName(String name) {
        this.name = name; // name 필드를 email로 변경
    }

    public void changeDel(boolean del) {
        this.del = del;
    }

    public void addRole(MemberRole memberRole) {
        this.roleSet.add(memberRole);
    }

    public void clearRoles() {
        this.roleSet.clear();
    }

    public void changeSocial(boolean social) {
        this.social = social;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roleSet.stream()
                .map(memberRole -> new SimpleGrantedAuthority("ROLE_" + memberRole.name()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return !del;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !del;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !del;
    }

    @Override
    public boolean isEnabled() {
        return !del && !social;
    }
}

