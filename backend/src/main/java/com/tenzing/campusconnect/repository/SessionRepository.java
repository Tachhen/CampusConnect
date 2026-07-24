package com.tenzing.campusconnect.repository;

import com.tenzing.campusconnect.entity.Session;
import com.tenzing.campusconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tenzing.campusconnect.dto.SessionResponse;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByMentor(User mentor);
}