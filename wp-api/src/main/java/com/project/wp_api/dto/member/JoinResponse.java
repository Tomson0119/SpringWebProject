package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(allOf = WpResponse.class)
public final class JoinResponse extends WpResponse {
    private long memberId;
    private String memberName;
}
