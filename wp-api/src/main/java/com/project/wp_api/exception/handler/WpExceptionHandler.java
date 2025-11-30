package com.project.wp_api.exception.handler;

import com.project.wp_api.dto.common.WpErrorResponse;
import com.project.wp_api.exception.WpException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WpExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<WpErrorResponse> handleException(WpException exception) {
        return ResponseEntity
            .status(exception.getStatusCode())
            .body(new WpErrorResponse(
                exception.getCustomErrorCode(),
                exception.getMessage()));
    }
}
