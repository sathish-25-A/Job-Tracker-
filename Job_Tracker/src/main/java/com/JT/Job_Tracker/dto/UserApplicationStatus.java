package com.JT.Job_Tracker.dto;

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
    
	public UserApplicationStatus() {
		
	}
    
}
