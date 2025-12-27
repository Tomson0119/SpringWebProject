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
        var response = new JoinResponse();

        logger.forInfoLog()
              .message("Got join request")
              .parameter(request.getName())
              .parameter(request.getPassword())
              .log();

        var newMember = memberService.join(
            request.getName(),
            request.getPassword());

        response.setMemberId(newMember.getId());
        response.setMemberName(newMember.getName());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .location(URI.create("/members/" + newMember.getId()))
            .body(response);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<FindMemberResponse> findById(@PathVariable("memberId") Long memberId) {
        var response = new FindMemberResponse();

        var findResult = memberService.findMemberById(memberId);
        if (findResult.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        var member = findResult.get();
        response.setMemberId(member.getId());
        response.setMemberName(member.getName());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<FindMemberResponse> findByName(@RequestParam("memberName") String memberName) {
        var response = new FindMemberResponse();

        var findResult = memberService.findMemberByName(memberName);
        if (findResult.isEmpty()) {
            throw new WpException(CustomErrorCode.MEMBER_NOT_FOUND);
        }

        var member = findResult.get();
        response.setMemberId(member.getId());
        response.setMemberName(member.getName());

        return ResponseEntity.ok(response);
    }
}
