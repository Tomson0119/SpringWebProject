package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpResponse;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@RequiredArgsConstructor
public final class JoinResponse extends WpResponse {
    private long memberId;
    private String memberName;
}
