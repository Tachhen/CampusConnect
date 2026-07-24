package com.tenzing.campusconnect.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentSessionResponse {

    private Long sessionId;
    private String title;
    private String description;
    private String mentorName;
    private LocalDateTime sessionTime;
    private LocalDateTime registeredAt;
}