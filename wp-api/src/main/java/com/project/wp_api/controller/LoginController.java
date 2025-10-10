package com.project.wp_api.controller;

import com.project.wp_api.dto.LoginRequest;
import com.project.wp_api.utility.HttpUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping
    public String login() {
        return "login";
    }

    @PostMapping
    public String login(LoginRequest request, HttpServletRequest httpRequest) {
        HttpUtils.PrintHttpRequest(httpRequest);
        return "login";
    }
}
