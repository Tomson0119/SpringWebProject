package com.project.wp_api.dto.common;

import com.project.wp_api.dto.common.enums.CustomErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class WpErrorResponse extends WpResponse {
    private final CustomErrorCode customErrorCode;
    private final String errorMessage;
}
