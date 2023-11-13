package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.domain.dto.MemberAuthorityDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {

    /* READ */
    List<Member> read(Member member);

    /* UPDATE */
    boolean update(MemberAuthorityDTO memberAuthority);

    /* UPGRADE AUTHORITY */
    boolean upgradeAuthority(MemberAuthorityDTO memberAuthority);

    /* DOWNGRADE AUTHORITY */
    boolean downgradeAuthority(MemberAuthorityDTO memberAuthority);

    /* DELETE */
    boolean delete(Member member);

    /* ReadCNT */
    Integer readCnt(Member member);
}
