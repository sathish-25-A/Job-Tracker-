package com.JT.Job_Tracker.Service;

import com.JT.Job_Tracker.dto.ApplicationInfo;
import com.JT.Job_Tracker.dto.UserApplicationStatus;
import com.JT.Job_Tracker.model.Application;
import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.ApplicationRepo;
import com.JT.Job_Tracker.repo.JobRepo;
import com.JT.Job_Tracker.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    // Get job by ID
    public Job getJobById(UUID id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    // Save a job
    public Job saveJob(Job job) {
        return jobRepo.save(job);
    }

    // Update job
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

    // Delete job
    public void deleteJob(UUID id) {
        if (!jobRepo.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }
        jobRepo.deleteById(id);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

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

        // Basic info
        status.setUserId(user.getId());
        status.setName(user.getName());
        status.setEmail(user.getEmail());

        // Stats
        status.setAppliedJobs(totalApplications);
        status.setAcceptedJobs(acceptedApplications);
        status.setRejectedJobs(rejectedApplications);

        // Profile
        status.setLocation(user.getLocation());
        status.setMobileNumber(user.getMobileNumber());
        status.setExperience(user.getExperience());
        status.setSkill(user.getSkill());
        status.setGender(user.getGender());
        status.setDob(user.getDob());
        status.setLanguage(user.getLanguage());
        status.setEducation(user.getEducation());

        // Resume
        status.setResume(user.getResume());

        return status;
    }

    // Get all applications
    public List<ApplicationInfo> getAllApplications() {
        List<Application> applications = applicationRepo.findAll();
        List<ApplicationInfo> dtoList = new ArrayList<>();

        for (Application app : applications) {
            ApplicationInfo dto = new ApplicationInfo();
            dto.setApplicationId(app.getId());
            dto.setUserId(app.getUser().getId());
            dto.setUserName(app.getUser().getName());
            dto.setJobId(app.getJob().getId());
            dto.setJobTitle(app.getJob().getTitle());
            dto.setStatus(app.getStatus());
            dtoList.add(dto);
        }

        return dtoList;
    }

    // Update application status
    public Application updateStatus(UUID appId, String status) {
        Application application = applicationRepo.findById(appId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(status.toUpperCase());
        return applicationRepo.save(application);
    }

    // Download resume by admin
    public byte[] downloadResume(UUID userId) throws IOException {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String filePath = user.getResume();
        if (filePath == null || filePath.isEmpty()) {
            throw new RuntimeException("Resume not uploaded yet");
        }

        Path path = Paths.get(filePath);
        return Files.readAllBytes(path);
    }

}
