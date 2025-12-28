package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public final class JoinResponse extends WpResponse {
    private final long memberId;
    private final String memberName;
}
