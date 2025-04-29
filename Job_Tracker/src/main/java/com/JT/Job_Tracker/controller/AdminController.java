package com.JT.Job_Tracker.controller;

import com.JT.Job_Tracker.model.Application;
import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.Service.JobService;
import com.JT.Job_Tracker.dto.ApplicationInfo;
import com.JT.Job_Tracker.dto.UserApplicationStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin/jobs")
public class AdminController {

	@Autowired
    private JobService jobService;

    // Method to add a job (only accessible by Admin)
    @PostMapping("/add")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        return ResponseEntity.ok(jobService.saveJob(job));
    }

    // Method to update a job (only accessible by Admin)
    @PutMapping("/update/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable UUID id, @RequestBody Job job) {
        return ResponseEntity.ok(jobService.updateJob(id, job));
    }

    // Method to delete a job (only accessible by Admin)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable UUID id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully.");
    }

    // Method to view all jobs (Admin only)
    @GetMapping("/list")
    public ResponseEntity<List<Job>> getAllJobsForAdmin() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
    
    //Method to list user with id
    @GetMapping("/list/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable UUID id){
    	return ResponseEntity.ok(jobService.getJobById(id));
    }
    
    //Method to list all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(jobService.getAllUsers());
    }
    
    //Method to list userDetails with stats
    @GetMapping("/users/stats/{userId}")
    public ResponseEntity<UserApplicationStatus> getUserApplicationStatsByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(jobService.getUserApplicationStatsByUserId(userId));
    }
    
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationInfo>> getAllApplications() {
        return ResponseEntity.ok(jobService.getAllApplications());
    }
    
  //Method to change the status of the job
  	@PutMapping("/status/{appId}")
  	public Application updateStatus(@PathVariable UUID appId, @RequestParam String status) {
  		return jobService.updateStatus(appId,status);
  	}


}
