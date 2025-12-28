package com.project.wp_api.dto.common;

import com.project.wp_api.dto.common.enums.CustomErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WpErrorResponse extends WpResponse {
    private CustomErrorCode customErrorCode;
    private String errorMessage;
}
