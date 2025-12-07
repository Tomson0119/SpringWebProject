package com.project.wp_api.controller.restApiController;

import com.project.wp_api.dto.account.JoinRequest;
import com.project.wp_api.dto.account.JoinResponse;
import com.project.wp_api.service.MemberService;
import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("account")
public class AccountApiController {
    private static final WpLogger logger = WpLogManager.getClassLogger(AccountApiController.class);

    @Autowired
    public MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest request) {
        var response = new JoinResponse();

        logger.forTraceLog()
              .message("Got join request")
              .parameter(request.getName())
              .parameter(request.getPassword())
              .log();

        var newMember = memberService.join(
            request.getName(),
            request.getPassword());

        response.setMemberId(newMember.getId());
        response.setMemberName(newMember.getName());

        return ResponseEntity.ok(response);
    }

}
