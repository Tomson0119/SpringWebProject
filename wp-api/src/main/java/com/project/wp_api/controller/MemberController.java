package com.project.wp_api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class MemberController {

    @GetMapping
    public String login() {
        return "login";
    }
}
