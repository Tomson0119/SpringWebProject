package com.project.wp_api.controller;

import com.project.wp_api.dto.LoginRequest;
import com.project.wp_api.service.LoginService;
import com.project.wp_api.utility.HttpUtils;
import com.project.wp_common.logManage.WpLogManager;
import com.project.wp_common.logManage.WpLogger;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/login")
public class LoginController {

    private static final WpLogger logger = WpLogManager.getClassLogger(LoginController.class);

    @GetMapping
    public String login() {
        return "login";
    }

    @PostMapping
    public String login(LoginRequest request, HttpServletRequest httpRequest) {
        HttpUtils.printHttpRequest(httpRequest, logger);
        return "login";
    }
}
