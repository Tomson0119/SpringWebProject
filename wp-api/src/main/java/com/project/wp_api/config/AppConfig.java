package com.project.wp_api.config;

import com.project.wp_api.config.property.MailProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class AppConfig {
    @Autowired
    public MailProperty mailProperty;

    @Bean
    public JavaMailSender javaMailSender() {
        var mailSender = new JavaMailSenderImpl();

        mailSender.setHost(mailProperty.getHost());
        mailSender.setPort(mailProperty.getPort());
        mailSender.setUsername(mailProperty.getUserName());
        mailSender.setPassword(mailProperty.getPassword());
        mailSender.setJavaMailProperties(mailProperty.getProperties());

        return mailSender;
    }
}
