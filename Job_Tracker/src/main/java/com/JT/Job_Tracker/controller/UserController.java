package com.JT.Job_Tracker.controller;

import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import java.io.IOException;


import com.JT.Job_Tracker.Service.JobService;
import com.JT.Job_Tracker.Service.UserService;
import com.JT.Job_Tracker.dto.UpdateUserRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user/jobs")
public class UserController {

	@Autowired
    private JobService jobService;
	
	@Autowired
	private UserService userService;
	

    // Method to get all jobs (User and Admin can access)
    @GetMapping("/list/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    // Method to get a job by ID (User and Admin can access)
    @GetMapping("/{jobId}")
    public ResponseEntity<Job> getJobById(@PathVariable UUID jobId) {
        Job job = jobService.getJobById(jobId);
        return ResponseEntity.ok(job);
    }
    
 // Method to update user details (name, email)
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String token, @RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUserDetails(token, request);
        return ResponseEntity.ok(updatedUser);
    }
    
    @PutMapping("/profile/update/{userId}")
    public ResponseEntity<User> updateProfile(@PathVariable UUID userId, @RequestBody User user) {
        User updatedProfile = userService.updateProfile(userId, user);
        return ResponseEntity.ok(updatedProfile);
    }
    
 // View user profile by userId
    @GetMapping("/profile/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable UUID userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/profile/{userId}/upload-resume")
    public ResponseEntity<String> uploadResume(
            @PathVariable UUID userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String filePath = userService.uploadResume(userId, file);
            return ResponseEntity.ok("Resume uploaded successfully: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload resume: " + e.getMessage());
        }
    }





   
}