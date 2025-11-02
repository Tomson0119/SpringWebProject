package com.project.wp_api.dto;

import com.project.wp_api.dto.common.WpRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(allOf = WpRequest.class)
public class LoginRequest extends WpRequest {
    private String name;
    private String password;
}