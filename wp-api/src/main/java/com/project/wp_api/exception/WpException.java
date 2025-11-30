package com.project.wp_api.exception;

import com.project.wp_api.dto.common.enums.CustomErrorCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.server.ResponseStatusException;

@Getter
@Setter
public class WpException extends ResponseStatusException {
    private CustomErrorCode customErrorCode;

    public WpException(CustomErrorCode customErrorCode) {
        super(customErrorCode.getHttpStatus(), customErrorCode.getMessage());
        this.customErrorCode = customErrorCode;
    }
}
