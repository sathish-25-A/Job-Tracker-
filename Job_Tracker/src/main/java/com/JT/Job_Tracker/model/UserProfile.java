package com.JT.Job_Tracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String location;

    private String mobileNumber;

    private String experience;

    private String skill;

    private String resume; 

    private String gender;

    private LocalDate dob;

    private String language;

    private String education;
}
