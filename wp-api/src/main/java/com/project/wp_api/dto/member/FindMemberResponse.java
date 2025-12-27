package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Setter;

@Setter
@Schema(allOf = WpResponse.class)
public class FindMemberResponse extends WpResponse {
    private Long memberId;
    private String memberName;
}
