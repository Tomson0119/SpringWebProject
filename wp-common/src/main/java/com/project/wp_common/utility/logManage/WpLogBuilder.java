package com.project.wp_common.utility.logManage;

import org.slf4j.event.Level;

import java.util.ArrayList;
import java.util.List;

public class WpLogBuilder {

    private final WpLogger wpLogger;
    private final Level logLevel;

    private String message;
    private final List<String> parameters = new ArrayList<>();

    public WpLogBuilder(WpLogger wpLogger, Level logLevel) {
        this.wpLogger = wpLogger;
        this.logLevel = logLevel;
    }

    public WpLogBuilder message(String msg) {
        this.message = msg;
        return this;
    }

    public WpLogBuilder exception(Exception exception) {
        this.message = exception.getMessage();
        return this;
    }

    public WpLogBuilder parameter(String param) {
        parameters.add(param);
        return this;
    }

    public void log() throws IllegalArgumentException {
        var logger = wpLogger.getLogger();

        var msg = buildMessage();

        switch (logLevel) {
            case TRACE -> logger.trace(msg);
            case DEBUG -> logger.debug(msg);
            case INFO -> logger.info(msg);
            case WARN -> logger.warn(msg);
            case ERROR -> logger.error(msg);
            default -> throw new IllegalArgumentException("Invalid value of logLevel: " + logLevel);
        }
    }

    private String buildMessage() {
        var stringBuilder = new StringBuilder();
        stringBuilder.append(message);

        if (parameters.isEmpty() == false) {
            stringBuilder.append('|');
        }

        for (var i = 0; i < parameters.size(); i++) {
            var param = parameters.get(i);

            stringBuilder.append('<');
            stringBuilder.append(param);
            stringBuilder.append('>');

            if (i < parameters.size() - 1) {
                stringBuilder.append(',');
            }
        }

        return stringBuilder.toString();
    }
}
