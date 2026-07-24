package com.tenzing.campusconnect.repository;

import com.tenzing.campusconnect.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileData, Long> {

}