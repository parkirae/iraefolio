package com.iraefolio.service;

import com.iraefolio.domain.Member;
import com.iraefolio.domain.MemberAuthority;
import com.iraefolio.domain.ReviewEntity;
import com.iraefolio.domain.dto.MemberAuthorityDTO;
import com.iraefolio.domain.dto.MemberDTO;
import com.iraefolio.mapper.AccountMapper;
import com.iraefolio.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Transactional
@Service
public class AccountService {

    private final AccountMapper mapper;

    /* READ */
    public List<Member> read(Member member) throws Exception {
        List<Member> list = mapper.read(member);
        return list;
    }

    /* UPDATE */
    public void update(List<MemberDTO> memberDTO) throws Exception {

        for (int i = 0; i < memberDTO.size(); i++) {

            MemberDTO e = memberDTO.get(i);

            if (e.isUpdated()) {
                if (e.getAuthorities().size() > 1 ) {
                    mapper.upgradeAuthority(e);
                } else {
                    mapper.downgradeAuthority(e);
                }
            } else if (e.isDeleted()) {
                mapper.delete(e.getMemberId());
                mapper.deleteAuthority(e.getMemberId());
            }
        }
    }

    /* ReadCnt */
    public Integer readCnt(Member member) throws Exception {
        Integer cnt = mapper.readCnt(member);
        return cnt;
    }
}