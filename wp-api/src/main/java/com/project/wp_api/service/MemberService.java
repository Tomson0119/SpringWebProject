package com.project.wp_api.service;

import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import com.project.wp_domain.entity.Member;
import com.project.wp_domain.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class MemberService {

    private static final WpLogger logger = WpLogManager.getClassLogger(MemberService.class);

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public int tryJoin(String memberName, String password) {
        var existingMember = findMemberByName(memberName);
        if (existingMember.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Duplicated member name");
        }

        var member = new Member();
        member.setName(memberName);
        member.setPassword(password);

        var result = memberRepository.save(member);
        if (member != result) {
            logger.forErrorLog()
                  .message("Invalid result")
                  .parameter(result)
                  .log();
            return -1;
        }

        logger.forInfoLog()
              .message("Succeeded to save new member")
              .parameter(member.getUid())
              .parameter(member.getName())
              .parameter(member.getPassword())
              .log();

        return 0;
    }

    public Optional<Member> findMemberById(long uid) {
        return Optional.empty();
    }

    public Optional<Member> findMemberByName(String memberName) {
        return memberRepository.findByName(memberName);
    }
}