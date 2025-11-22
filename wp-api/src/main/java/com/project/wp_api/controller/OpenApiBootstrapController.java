package com.project.wp_api.controller;

import com.project.wp_api.dto.common.WpErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenApiBootstrapController {

    @GetMapping("/__schema_bootstrap__")
    @Operation(summary = "스키마 부트스트랩")
    @ApiResponse(
        responseCode = "200",
        description = "스키마 생성용",
        content = @Content(schema = @Schema(implementation = WpErrorResponse.class))
    )
    public void bootstrap() {
    }
}
