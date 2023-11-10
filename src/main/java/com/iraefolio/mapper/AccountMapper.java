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

    boolean upgradeAuthority(MemberAuthorityDTO memberAuthority);

    boolean downgradeAuthority(MemberAuthorityDTO memberAuthority);

    /* DELETE */
//    boolean delete(MemberAuthority memberAuthority);

    /* ReadCNT */
    Integer readCnt(Member member);
}
