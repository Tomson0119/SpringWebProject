package com.project.wp_api.dto.common.enums;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Schema(enumAsRef = true)
public enum CustomErrorCode {
    UNDEFINED(HttpStatus.INTERNAL_SERVER_ERROR, "Undefined error"),

    // Member
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "Cannot find member"),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "Wrong password"),

    DUPLICATED_MEMBER(HttpStatus.CONFLICT, "Member already exists"),
    DUPLICATED_MEMBER_NAME(HttpStatus.CONFLICT, "Name already exists"),
    DUPLICATED_MEMBER_EMAIL(HttpStatus.CONFLICT, "Email address already exists"),

    INVALID_VERIFICATION_CODE(HttpStatus.BAD_REQUEST, "Verification code is not correct");

    private final HttpStatus httpStatus;
    private final String message;

    CustomErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

