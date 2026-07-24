package com.tenzing.campusconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDateTime sessionTime;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Registration> registrations;
}