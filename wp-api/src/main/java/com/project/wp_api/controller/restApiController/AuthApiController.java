package com.project.wp_api.controller.restApiController;

import com.project.wp_api.dto.auth.LoginRequest;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthApiController {

    private static final WpLogger logger = WpLogManager.getClassLogger(AuthApiController.class);

    @Autowired
    public MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request) {

        logger.forInfoLog()
              .message("Got login request")
              .parameter(request.getName())
              .log();

        var loginResult = memberService.tryLogin(request.getName(), request.getPassword());
        if (loginResult == false) {
            throw new WpException(CustomErrorCode.UNDEFINED);
        }

        return ResponseEntity
            .status(HttpStatus.SEE_OTHER)
            .header(HttpHeaders.LOCATION, "/")
            .build();
    }
}



