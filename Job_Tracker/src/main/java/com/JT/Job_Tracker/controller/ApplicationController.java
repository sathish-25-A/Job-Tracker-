package com.JT.Job_Tracker.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.JT.Job_Tracker.Service.ApplicationService;
import com.JT.Job_Tracker.model.Application;

@RestController
@RequestMapping("/application")
public class ApplicationController {
	
	@Autowired
	private ApplicationService appService;
	
	//Method to apply for the job
	@PostMapping("/apply/{jobId}")
	public Application apply(@PathVariable UUID jobId) {
		return appService.applyForJob(jobId);
	}
	
	//Method to search for applied job(Admin)
	@GetMapping("/job/{jobID}")
	public List<Application> getByJob(@PathVariable UUID jobID){
		return appService.getByJob(jobID);
	}
	//Method to search for applied job(User)
	@GetMapping("/user/{userID}")
	public List<Application> getByUser(@PathVariable UUID userID){
		return appService.getByUser(userID);
	}
	
	
	

}
