package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpResponse;
import lombok.Setter;

@Setter
public final class FindMemberResponse extends WpResponse {
    private Long memberId;
    private String memberName;
}
