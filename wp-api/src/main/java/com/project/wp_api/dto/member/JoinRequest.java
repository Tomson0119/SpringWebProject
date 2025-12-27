package com.project.wp_api.dto.member;

import com.project.wp_api.dto.common.WpRequest;
import lombok.Getter;

@Getter
public final class JoinRequest extends WpRequest {
    private String name;
    private String password;
}
