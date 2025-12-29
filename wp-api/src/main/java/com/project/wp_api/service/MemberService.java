package com.project.wp_api.service;

import com.project.wp_api.dto.common.enums.CustomErrorCode;
import com.project.wp_api.exception.WpException;
import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import com.project.wp_domain.entity.Member;
import com.project.wp_domain.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private static final WpLogger logger = WpLogManager.getClassLogger(MemberService.class);

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member join(String memberName, String password) {
        var existingMember = findMemberByName(memberName);
        if (existingMember.isPresent()) {
            throw new WpException(CustomErrorCode.DUPLICATED_MEMBER_NAME);
        }

        var member = new Member();
        member.setName(memberName);
        member.setPassword(password);

        logger.forInfoLog()
              .message("Joined new member")
              .parameter(member.getName())
              .log();

        return memberRepository.save(member);
    }

    public Optional<Member> findMemberById(long uid) {
        return memberRepository.findById(uid);
    }

    public Optional<Member> findMemberByName(String memberName) {
        return memberRepository.findByName(memberName);
    }

    public Optional<Member> findMemberByEmailAddress(String emailAddress) {
        return memberRepository.findByEmailAddress(emailAddress);
    }

    public boolean tryLogin(String memberName, String password) {
        var member = findMemberByName(memberName);
        if (member.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        var validPassword = member.get().getPassword();
        if (validPassword.equals(password) == false) {
            throw new WpException(CustomErrorCode.INVALID_PASSWORD);
        }

        return true;
    }
}