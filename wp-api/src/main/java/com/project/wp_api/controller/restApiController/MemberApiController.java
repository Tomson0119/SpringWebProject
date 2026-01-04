package com.project.wp_api.controller.restApiController;

import com.project.wp_api.dto.member.FindMemberResponse;
import com.project.wp_api.dto.member.JoinRequest;
import com.project.wp_api.dto.member.JoinResponse;
import com.project.wp_api.dto.common.enums.CustomErrorCode;
import com.project.wp_api.exception.WpException;
import com.project.wp_api.service.MemberService;
import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/members")
public class MemberApiController {
    private static final WpLogger logger = WpLogManager.getClassLogger(MemberApiController.class);

    @Autowired
    public MemberService memberService;

    @PostMapping
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest request) {
        logger.forInfoLog()
              .message("Got join request")
              .parameter(request.getName())
              .parameter(request.getEmailAddress())
              .log();

        var newMember = memberService.join(
            request.getEmailAddress(),
            request.getName(),
            request.getPassword());

        var response = new JoinResponse(
            newMember.getId(),
            newMember.getName());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .location(URI.create("/members/" + newMember.getId()))
            .body(response);
    }

    @GetMapping("/check-name")
    public ResponseEntity<Void> checkNameDuplication(@RequestParam("name") String memberName) {
        var findResult = memberService.findMemberByName(memberName);
        if (findResult.isPresent()) {
            throw new WpException(CustomErrorCode.DUPLICATED_MEMBER_NAME);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-email")
    public ResponseEntity<Void> checkEmailDuplication(@RequestParam("email") String emailAddress) {
        var findResult = memberService.findMemberByEmailAddress(emailAddress);
        if (findResult.isPresent()) {
            throw new WpException(CustomErrorCode.DUPLICATED_MEMBER_EMAIL);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/find-pw")
    public ResponseEntity<Void> findPassword(@RequestParam("name") String memberName) {

        logger.forInfoLog()
              .message("Got find pw request")
              .parameter(memberName)
              .log();

        var findResult = memberService.findMemberByName(memberName);
        if (findResult.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        //TODO: 등록된 이메일로 임시 비밀번호 전송

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FindMemberResponse> findById(@PathVariable("id") Long memberId) {
        var findResult = memberService.findMemberById(memberId);
        if (findResult.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        var member = findResult.get();
        var response = new FindMemberResponse(
            member.getId(),
            member.getName());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<FindMemberResponse> findByName(@RequestParam("name") String memberName) {
        var findResult = memberService.findMemberByName(memberName);
        if (findResult.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        var member = findResult.get();
        var response = new FindMemberResponse(
            member.getId(),
            member.getName());

        return ResponseEntity.ok(response);
    }
}
