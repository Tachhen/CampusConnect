package com.tenzing.campusconnect.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionRequest {

    private String title;
    private String description;
    private LocalDateTime sessionTime;
}