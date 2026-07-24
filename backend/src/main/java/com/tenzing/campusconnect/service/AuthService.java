package com.tenzing.campusconnect.service;

import com.tenzing.campusconnect.dto.JwtResponse;
import com.tenzing.campusconnect.dto.LoginRequest;
import com.tenzing.campusconnect.dto.RegisterRequest;
import com.tenzing.campusconnect.entity.Role;
import com.tenzing.campusconnect.entity.User;
import com.tenzing.campusconnect.repository.UserRepository;
import com.tenzing.campusconnect.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);

        return "Registration Successful";
    }

    public JwtResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());

        return new JwtResponse(
                token,
                user.getRole().name(),
                user.getName()      // <-- sends username to frontend
        );
    }
}