package com.JT.Job_Tracker.dto;

import java.util.UUID;

public class LoginResponse {
    private String token;
    private UUID userId;
    private String name;
    private String email;
    private String role;

    public LoginResponse(String token, UUID userId, String name, String email, String role) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}

