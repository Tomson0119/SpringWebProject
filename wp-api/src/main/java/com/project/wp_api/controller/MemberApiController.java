package com.project.wp_api.controller;

import com.project.wp_api.dto.JoinRequest;
import com.project.wp_api.dto.JoinResponse;
import com.project.wp_api.dto.LoginRequest;
import com.project.wp_api.dto.LoginResponse;
import com.project.wp_api.dto.common.enums.CustomErrorCode;
import com.project.wp_api.exception.WpException;
import com.project.wp_api.service.MemberService;
import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberApiController {

    private static final WpLogger logger = WpLogManager.getClassLogger(MemberController.class);

    @Autowired
    public MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        var response = new LoginResponse();

        //TODO: 그냥 보내면 유출될 수 있으므로 암호화 등의 방식을 사용하도록 변경

        logger.forTraceLog()
              .message("Got login request")
              .parameter(request.getName())
              .log();

        var loginResult = memberService.tryLogin(request.getName(), request.getPassword());
        if (loginResult == false) {
            throw new WpException(CustomErrorCode.UNDEFINED);
        }

        return ResponseEntity
            .status(HttpStatus.FOUND)
            .header(HttpHeaders.LOCATION, "/")
            .body(response);
    }

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



