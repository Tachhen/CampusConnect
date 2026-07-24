package com.tenzing.campusconnect.repository;

import com.tenzing.campusconnect.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}