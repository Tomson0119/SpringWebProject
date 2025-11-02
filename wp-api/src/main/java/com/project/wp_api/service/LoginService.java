package com.project.wp_api.service;

import com.project.wp_common.utility.logManage.WpLogManager;
import com.project.wp_common.utility.logManage.WpLogger;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private static final WpLogger logger = WpLogManager.getClassLogger(LoginService.class);

    public LoginService() {
        logger.forInfoLog()
              .message("LoginService has been instantiated")
              .parameter("lol")
              .parameter("wow")
              .log();
    }
}