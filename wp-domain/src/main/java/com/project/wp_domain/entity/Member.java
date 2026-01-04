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
        @Index(name = "idx_emailAddress_name", columnList = "email_address, name")
    })
public class Member {
    @Column(name = "email_address", nullable = false, unique = true)
    private final String emailAddress;

    @Column(name = "name", nullable = false, unique = true)
    private final String name;

    @Column(name = "password", nullable = false)
    private final String password;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}


















