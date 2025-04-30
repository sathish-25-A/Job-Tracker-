package com.JT.Job_Tracker.model;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="users")
@Data
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // "USER" or "ADMIN"

    // Profile-related fields directly inside User
    private String location;

    private String mobileNumber;

    private String experience;

    private String skill;

    private String gender;

    private LocalDate dob;

    private String language;

    private String education;

    private String resume; // Path to resume file
}
