package com.tenzing.campusconnect.controller;

import com.tenzing.campusconnect.dto.JwtResponse;
import com.tenzing.campusconnect.dto.LoginRequest;
import com.tenzing.campusconnect.dto.RegisterRequest;
import com.tenzing.campusconnect.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}