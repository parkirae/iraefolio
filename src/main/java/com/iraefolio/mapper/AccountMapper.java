package com.iraefolio.mapper;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.domain.dto.MemberAuthorityDTO;
import com.iraefolio.domain.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {

    /* READ */
    List<Member> read(Member member);

    /* UPDATE */
    boolean update(MemberAuthorityDTO memberAuthority);

    /* UPGRADE AUTHORITY */
    boolean upgradeAuthority(MemberDTO memberDTO);

    /* DOWNGRADE AUTHORITY */
    boolean downgradeAuthority(MemberDTO memberDTO);

    /* DELETE */
    boolean delete(Long memberId);

    /* DELETE AUTHORTIY */
    boolean deleteAuthority(Long memberId);

    /* ReadCNT */
    Integer readCnt(Member member);
}
