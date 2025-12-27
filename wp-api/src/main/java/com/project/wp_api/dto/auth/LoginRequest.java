package com.project.wp_api.dto.auth;

import com.project.wp_api.dto.common.WpRequest;
import lombok.Getter;

@Getter
public final class LoginRequest extends WpRequest {
    private String name;
    private String password;
}