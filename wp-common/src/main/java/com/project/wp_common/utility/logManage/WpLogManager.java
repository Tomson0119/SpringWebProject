package com.project.wp_common.utility.logManage;

public final class WpLogManager {

    private WpLogManager() {
    }

    public static WpLogger getClassLogger(Class<?> classe) {
        return new WpLogger(classe);
    }
}
