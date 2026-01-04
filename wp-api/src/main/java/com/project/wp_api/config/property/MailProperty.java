package com.project.wp_api.config.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.Properties;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "spring.mail")
public class MailProperty {
    private String host;
    private int port;
    private String userName;
    private String password;
    private Map<String, String> properties;

    public Properties getProperties() {
        var props = new Properties();
        props.putAll(properties);
        return props;
    }
}
