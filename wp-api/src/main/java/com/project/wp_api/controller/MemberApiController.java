package com.project.wp_api.controller;

import com.project.wp_api.dto.JoinRequest;
import com.project.wp_api.dto.JoinResponse;
import com.project.wp_api.dto.LoginRequest;
import com.project.wp_api.dto.LoginResponse;
import com.project.wp_api.service.LoginService;
import com.project.wp_common.logManage.WpLogManager;
import com.project.wp_common.logManage.WpLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberApiController {

    private static final WpLogger logger = WpLogManager.getClassLogger(MemberController.class);

    @Autowired
    public LoginService loginService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        //TODO: 그냥 보내면 유출될 수 있으므로 암호화 등의 방식을 사용하도록 변경

        logger.forInfoLog()
              .message("Got login request")
              .parameter(request.getName())
              .parameter(request.getPassword())
              .log();

        return new LoginResponse(
            request.getName(),
            request.getPassword());
    }

    @PostMapping("/join")
    public JoinResponse join(@RequestBody JoinRequest request) {


        return new JoinResponse(request.getName(), request.getPassword());
    }
}



