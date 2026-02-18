package com.project.wp_api.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.IntStream;

@Service
public abstract class MailService {
    private final int VerificationCodeLength = 4;

    @Autowired
    public JavaMailSender mailSender;

    public void sendSimpleMessage(SimpleMailMessage message) {
        mailSender.send(message);
    }

    public void sendMimeMessage(MimeMailMessage message) {
        mailSender.send(message.getMimeMessage());
    }

    public String generateVerificationCode() {
        var verificationCode = new StringBuilder();
        var numbers = new ArrayList<>(IntStream.range(0, 10).boxed().toList());
        Collections.shuffle(numbers);

        for (int i = 0; i < VerificationCodeLength; i++) {
            var number = numbers.get(i);
            verificationCode.append(number);
        }

        return verificationCode.toString();
    }
}
