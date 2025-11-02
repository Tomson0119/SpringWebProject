package com.project.wp_api.dto.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WpResponse implements WpDto {
    private int customErrorCode;
}
