package com.project.wp_domain.repository;

import com.project.wp_domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByName(String memberName);

    Optional<Member> findByEmailAddress(String emailAddress);

    Optional<Member> findByEmailAddressAndName(String emailAddress, String memberName);
}
