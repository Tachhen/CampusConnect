package com.tenzing.campusconnect.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionResponse {

    private Long id;

    private String title;

    private String description;

    private LocalDateTime sessionTime;

    private String mentorName;
}