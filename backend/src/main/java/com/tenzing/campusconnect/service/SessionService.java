package com.tenzing.campusconnect.service;

import com.tenzing.campusconnect.dto.SessionRequest;
import com.tenzing.campusconnect.dto.SessionResponse;
import com.tenzing.campusconnect.dto.StudentSessionResponse;
import com.tenzing.campusconnect.entity.Registration;
import com.tenzing.campusconnect.entity.Role;
import com.tenzing.campusconnect.entity.Session;
import com.tenzing.campusconnect.entity.User;
import com.tenzing.campusconnect.repository.RegistrationRepository;
import com.tenzing.campusconnect.repository.SessionRepository;
import com.tenzing.campusconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    // Create Session
    public String createSession(SessionRequest request, String email) {

        User mentor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (mentor.getRole() != Role.MENTOR) {
            return "Only mentors can create sessions.";
        }

        Session session = Session.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .sessionTime(request.getSessionTime())
                .mentor(mentor)
                .build();

        sessionRepository.save(session);

        return "Session created successfully.";
    }

    // Get All Sessions
    public List<SessionResponse> getAllSessions() {

        return sessionRepository.findAll()
                .stream()
                .map(session -> SessionResponse.builder()
                        .id(session.getId())
                        .title(session.getTitle())
                        .description(session.getDescription())
                        .sessionTime(session.getSessionTime())
                        .mentorName(session.getMentor().getName())
                        .build())
                .toList();
    }

    // NEW: Get Only Logged-in Mentor Sessions
    public List<SessionResponse> getMentorSessions(Authentication authentication) {

        User mentor = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return sessionRepository.findByMentor(mentor)
                .stream()
                .map(session -> SessionResponse.builder()
                        .id(session.getId())
                        .title(session.getTitle())
                        .description(session.getDescription())
                        .sessionTime(session.getSessionTime())
                        .mentorName(session.getMentor().getName())
                        .build())
                .toList();
    }

    // Get One Session
    public Session getSession(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }

    // Delete Session
    public String deleteSession(Long id, String email) {

        User mentor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (!session.getMentor().getId().equals(mentor.getId())) {
            return "You can delete only your own sessions.";
        }

        sessionRepository.delete(session);

        return "Session deleted successfully.";
    }

    // Register Student
    public String registerForSession(Long sessionId, String email) {

        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            return "Only students can register.";
        }

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (registrationRepository.findByStudentAndSession(student, session).isPresent()) {
            return "Already registered.";
        }

        Registration registration = Registration.builder()
                .student(student)
                .session(session)
                .registeredAt(LocalDateTime.now())
                .build();

        registrationRepository.save(registration);

        return "Registered successfully.";
    }

    // Get Registered Sessions of Logged-in Student
    public List<StudentSessionResponse> getRegisteredSessions(Authentication authentication) {

        User student = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Registration> registrations = registrationRepository.findByStudent(student);

        return registrations.stream()
                .map(registration -> StudentSessionResponse.builder()
                        .sessionId(registration.getSession().getId())
                        .title(registration.getSession().getTitle())
                        .description(registration.getSession().getDescription())
                        .mentorName(registration.getSession().getMentor().getName())
                        .sessionTime(registration.getSession().getSessionTime())
                        .registeredAt(registration.getRegisteredAt())
                        .build())
                .toList();
    }
}