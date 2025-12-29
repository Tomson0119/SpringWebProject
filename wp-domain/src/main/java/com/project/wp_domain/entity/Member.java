package com.project.wp_domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(
    name = "member",
    indexes = {
        @Index(name = "idx_name_emailAddress", columnList = "name, email_address")
    })
public class Member {
    @Column(name = "name", nullable = false)
    private final String name;

    @Column(name = "email_address", nullable = false, unique = true)
    private final String emailAddress;

    @Column(name = "password", nullable = false)
    private final String password;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}


















