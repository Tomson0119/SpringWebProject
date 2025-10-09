package com.project.wp_api.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @GetMapping("login")
    public String login(HttpServletRequest request) {
        return "login";
    }
}
