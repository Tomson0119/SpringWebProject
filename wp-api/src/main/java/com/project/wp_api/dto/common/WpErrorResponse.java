package com.project.wp_api.dto.common;

import com.project.wp_api.dto.common.enums.CustomErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Schema(allOf = WpResponse.class)
public class WpErrorResponse extends WpResponse {
    private final CustomErrorCode customErrorCode;
    private final String errorMessage;
}
