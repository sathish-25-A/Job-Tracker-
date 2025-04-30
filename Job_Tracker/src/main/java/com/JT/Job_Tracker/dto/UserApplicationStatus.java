package com.JT.Job_Tracker.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Data;

@Data
public class UserApplicationStatus {
	
	private UUID userId;
    private String name;
    private String email;
    private int appliedJobs;
    private int acceptedJobs;
    private int rejectedJobs;
    private String location;
    private String mobileNumber;
    private String experience;
    private String skill;
    private String gender;
    private LocalDate dob;
    private String language;
    private String education;
    private String resume;
    
	public UserApplicationStatus() {
		
	}
    
}
