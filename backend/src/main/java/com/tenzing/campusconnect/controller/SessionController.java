package com.tenzing.campusconnect.controller;

import com.tenzing.campusconnect.dto.SessionRequest;
import com.tenzing.campusconnect.dto.SessionResponse;
import com.tenzing.campusconnect.dto.StudentSessionResponse;
import com.tenzing.campusconnect.entity.Session;
import com.tenzing.campusconnect.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Create Session
    @PostMapping
    public String createSession(@RequestBody SessionRequest request,
                                Authentication authentication) {

        return sessionService.createSession(request, authentication.getName());
    }

    // Get All Sessions
    @GetMapping
    public List<SessionResponse> getAllSessions() {
        return sessionService.getAllSessions();
    }

    // Get Logged-in Mentor Sessions
    @GetMapping("/mentor")
    public List<SessionResponse> getMentorSessions(Authentication authentication) {
        return sessionService.getMentorSessions(authentication);
    }

    // Get Logged-in Student Sessions
    @GetMapping("/student")
    public List<StudentSessionResponse> getStudentSessions(Authentication authentication) {
        return sessionService.getRegisteredSessions(authentication);
    }

    // Get One Session
    @GetMapping("/{id}")
    public Session getSession(@PathVariable Long id) {
        return sessionService.getSession(id);
    }

    // Delete Session
    @DeleteMapping("/{id}")
    public String deleteSession(@PathVariable Long id,
                                Authentication authentication) {

        return sessionService.deleteSession(id, authentication.getName());
    }

    // Register Student
    @PostMapping("/{id}/register")
    public String register(@PathVariable Long id,
                           Authentication authentication) {

        return sessionService.registerForSession(id, authentication.getName());
    }
}