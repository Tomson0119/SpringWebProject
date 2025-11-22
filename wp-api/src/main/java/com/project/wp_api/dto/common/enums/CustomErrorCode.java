package com.project.wp_api.dto.common.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "메롱이다", enumAsRef = true)
public enum CustomErrorCode {
    TEST_01,
    TEST_02
}
