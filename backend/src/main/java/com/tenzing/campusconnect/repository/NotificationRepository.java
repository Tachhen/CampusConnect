package com.tenzing.campusconnect.repository;

import com.tenzing.campusconnect.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}