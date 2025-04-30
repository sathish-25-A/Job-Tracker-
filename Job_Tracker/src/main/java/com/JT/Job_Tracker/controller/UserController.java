package com.JT.Job_Tracker.controller;


import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.Service.JobService;
import com.JT.Job_Tracker.Service.UserService;
import com.JT.Job_Tracker.dto.UpdateUserRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
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
        // Return the user details including the resume path
        return ResponseEntity.ok(user);
    }

    // Method to upload resume
    @PostMapping("/profile/{userId}/upload-resume")
    public ResponseEntity<String> uploadResume(
            @PathVariable UUID userId,
            @RequestParam("file") MultipartFile file) {
        try {
            // Validate file type (optional)
            if (!file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Only PDF files are allowed.");
            }

            // Upload resume and get the public URL
            String fileUrl = userService.uploadResume(userId, file);

            // Return the public URL or a success message
            return ResponseEntity.ok("Resume uploaded successfully: " + fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload resume: " + e.getMessage());
        }
    }

    // Endpoint to serve the resume file to the frontend
    @GetMapping("/profile/{userId}/resume/{filename}")
    public ResponseEntity<Resource> serveResume(@PathVariable UUID userId, @PathVariable String filename) {
        try {
            Path filePath = userService.getResumeFilePath(userId, filename);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(404).body(null); // Not found
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Internal server error
        }
    }
	//Method to download resume by user
  	@GetMapping("/profile/download-resume/{userId}")
  	public ResponseEntity<byte[]> downloadResume(@PathVariable UUID userId) throws IOException {
  	    byte[] resumeData = jobService.downloadResume(userId);

  	    return ResponseEntity.ok()
  	            .header("Content-Disposition", "attachment; filename=resume.pdf")
  	            .header("Content-Type", "application/pdf")
  	            .body(resumeData);
  	}
}
