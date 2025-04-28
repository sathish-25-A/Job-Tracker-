package com.JT.Job_Tracker.controller;

import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.Service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user/jobs")
public class UserController {

	@Autowired
    private JobService jobService;
	

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
    
   
}
