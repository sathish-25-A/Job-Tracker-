package com.JT.Job_Tracker.Service;

import com.JT.Job_Tracker.config.*;
import com.JT.Job_Tracker.dto.UserApplicationStatus;
import com.JT.Job_Tracker.model.Application;
import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.ApplicationRepo;
import com.JT.Job_Tracker.repo.JobRepo;
import com.JT.Job_Tracker.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JobService {
	
	@Autowired
    private JobRepo jobRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ApplicationRepo applicationRepo;


    // Method to get all jobs
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    // Method to get a job by ID
    public Job getJobById(UUID id) {
        return jobRepo.findById(id).orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    // Method to save a new job
    public Job saveJob(Job job) {
        return jobRepo.save(job);
    }

    // Method to update an existing job
    public Job updateJob(UUID id, Job jobDetails) {
        Job existingJob = jobRepo.findById(id)
                                 .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        existingJob.setTitle(jobDetails.getTitle());
        existingJob.setDescription(jobDetails.getDescription());
        existingJob.setLocation(jobDetails.getLocation());
        existingJob.setCompany(jobDetails.getCompany());
        existingJob.setJobType(jobDetails.getJobType());
        existingJob.setSalary(jobDetails.getSalary());
        return jobRepo.save(existingJob);
    }

    // Method to delete a job
    public void deleteJob(UUID id) {
        if (!jobRepo.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }
        jobRepo.deleteById(id);
    }

    //Method to list all users
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	//Method to get User status by Id
	public UserApplicationStatus getUserApplicationStatsByUserId(UUID userId) {
	    User user = userRepo.findById(userId)
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    List<Application> applications = applicationRepo.findByUserId(userId);

	    int totalApplications = applications.size();
	    int acceptedApplications = (int) applications.stream()
	            .filter(app -> "ACCEPTED".equalsIgnoreCase(app.getStatus()))
	            .count();
	    int rejectedApplications = (int) applications.stream()
	            .filter(app -> "REJECTED".equalsIgnoreCase(app.getStatus()))
	            .count();

	    UserApplicationStatus status = new UserApplicationStatus();
	    status.setUserId(user.getId());
	    status.setName(user.getName());
	    status.setEmail(user.getEmail());
	    status.setAppliedJobs(totalApplications);
	    status.setAcceptedJobs(acceptedApplications);
	    status.setRejectedJobs(rejectedApplications);

	    return status;
	}
	//Method to get all Applications
	public List<Application> getAllApplications() {
	    return applicationRepo.findAll();
	}
	
	//Methos to update status of specific application
	public Application updateStatus(UUID appId, String status) {
	    Application application = applicationRepo.findById(appId)
	            .orElseThrow(() -> new RuntimeException("Application not found"));

	    application.setStatus(status.toUpperCase());
	    return applicationRepo.save(application);
	}



}
	
