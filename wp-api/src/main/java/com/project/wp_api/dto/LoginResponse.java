package com.project.wp_api.dto;

import com.project.wp_api.dto.common.WpResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse extends WpResponse {
    private String name;
    private String password;
}
