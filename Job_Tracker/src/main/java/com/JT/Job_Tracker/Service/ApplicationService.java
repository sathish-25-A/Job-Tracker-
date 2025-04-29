package com.JT.Job_Tracker.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.JT.Job_Tracker.model.Application;
import com.JT.Job_Tracker.model.Job;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.ApplicationRepo;
import com.JT.Job_Tracker.repo.JobRepo;
import com.JT.Job_Tracker.repo.UserRepo;

@Service
public class ApplicationService {

	@Autowired
	private ApplicationRepo appRepo;
	@Autowired
	private JobRepo jobRepo;
	@Autowired
	private UserRepo userRepo;

	public Application applyForJob(UUID jobId) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String email = auth.getName();

		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		Job job = jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not Found"));

		Application app = new Application();
		app.setUser(user);
		app.setJob(job);
		return appRepo.save(app);
	}

	public List<Application> getByJob(UUID jobId) {
		return appRepo.findByJobId(jobId);
	}

	public List<Application> getByUser(UUID userID) {
		return appRepo.findByUserId(userID);
	}

	
	 

}
