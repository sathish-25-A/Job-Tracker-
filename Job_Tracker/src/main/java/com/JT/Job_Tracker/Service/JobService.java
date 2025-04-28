package com.JT.Job_Tracker.Service;

import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
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

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

}
