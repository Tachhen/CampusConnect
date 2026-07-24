package com.tenzing.campusconnect.repository;

import com.tenzing.campusconnect.entity.Registration;
import com.tenzing.campusconnect.entity.Session;
import com.tenzing.campusconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    Optional<Registration> findByStudentAndSession(User student, Session session);

    List<Registration> findByStudent(User student);

    List<Registration> findBySession(Session session);
}