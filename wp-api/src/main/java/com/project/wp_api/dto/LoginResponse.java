package com.project.wp_api.dto;

import com.project.wp_api.dto.common.WpResponse;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(allOf = WpResponse.class)
public final class LoginResponse extends WpResponse {
}
