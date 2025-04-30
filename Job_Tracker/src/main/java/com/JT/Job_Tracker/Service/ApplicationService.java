package com.JT.Job_Tracker.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.JT.Job_Tracker.dto.ApplicationInfo;
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

	public List<ApplicationInfo> getAllApplicationsWithDetails() {
	    List<Application> applications = appRepo.findAll();
	    List<ApplicationInfo> dtoList = new ArrayList<>();

	    for (Application app : applications) {
	        ApplicationInfo dto = new ApplicationInfo();
	        dto.setApplicationId(app.getId());
	        dto.setUserId(app.getUser().getId());
	        dto.setUserName(app.getUser().getName());
	        dto.setJobId(app.getJob().getId());
	        dto.setJobTitle(app.getJob().getTitle());
	        dto.setCompany(app.getJob().getCompany());
	        dto.setStatus(app.getStatus());
	        dtoList.add(dto);
	    }

	    return dtoList;
	}
}
