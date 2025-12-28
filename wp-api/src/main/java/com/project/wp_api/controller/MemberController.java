package com.project.wp_api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
    @GetMapping("/join")
    public String join() {
        return "join";
    }

    @GetMapping("/account/find-pw")
    public String findPassword() {
        return "account/find-pw";
    }
}
