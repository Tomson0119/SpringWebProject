package com.project.wp_api.controller;

import com.project.wp_api.dto.JoinRequest;
import com.project.wp_api.dto.JoinResponse;
import com.project.wp_api.dto.LoginRequest;
import com.project.wp_api.dto.LoginResponse;
import com.project.wp_api.service.MemberService;
import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;

@RestController
public class MemberApiController {

    private static final WpLogger logger = WpLogManager.getClassLogger(MemberController.class);

    @Autowired
    public MemberService memberService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        var response = new LoginResponse(
            request.getName(),
            request.getPassword());

        try {
            //TODO: 그냥 보내면 유출될 수 있으므로 암호화 등의 방식을 사용하도록 변경

            logger.forInfoLog()
                  .message("Got login request")
                  .parameter(request.getName())
                  .parameter(request.getPassword())
                  .log();

        } catch (Exception exception) {
            logger.forErrorLog()
                  .exception(exception)
                  .parameter(request.getName())
                  .parameter(request.getPassword())
                  .log();
        }

        return response;
    }

    @PostMapping("/join")
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest request) {

        var response = new JoinResponse(
            request.getName(),
            request.getPassword());

        logger.forInfoLog()
              .message("Try join new member")
              .parameter(request.getName())
              .parameter(request.getPassword())
              .log();

        var result = memberService.tryJoin(
            request.getName(),
            request.getPassword());

        if (result < 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This is bad");
        }

        return ResponseEntity.created(URI.create("/join")).body(response);
    }
}



