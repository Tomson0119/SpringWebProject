package com.project.wp_api.dto;

import com.project.wp_api.dto.common.WpRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest extends WpRequest {
    private String name;
    private String password;
}