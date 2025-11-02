package com.project.wp_api.dto;

import com.project.wp_api.dto.common.WpResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Schema(allOf = WpResponse.class)
public class LoginResponse extends WpResponse {
    private String name;
    private String password;
}
