package com.project.wp_common.logManage;

import com.fasterxml.jackson.databind.exc.InvalidDefinitionException;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.event.Level;

/// <summary>
/// SLF4J Log 시스템을 Wp 프로젝트에 맞게 랩핑한 클래스
/// </summary>
@Getter
public class WpLogger {

    private final Logger logger;

    public WpLogger(Class<?> tClass) {
        logger = LoggerFactory.getLogger(tClass);
    }

    public WpLogBuilder getBuilder(Level logLevel) {
        return new WpLogBuilder(this, logLevel);
    }

    public WpLogBuilder forTraceLog() {
        return getBuilder(Level.TRACE);
    }

    public WpLogBuilder forDebugLog() {
        return getBuilder(Level.DEBUG);
    }

    public WpLogBuilder forInfoLog() {
        return getBuilder(Level.INFO);
    }

    public WpLogBuilder forWarnLog() {
        return getBuilder(Level.WARN);
    }

    public WpLogBuilder forErrorLog() {
        return getBuilder(Level.ERROR);
    }
}
