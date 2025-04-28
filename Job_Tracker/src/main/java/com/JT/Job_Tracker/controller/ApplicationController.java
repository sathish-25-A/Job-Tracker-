package com.JT.Job_Tracker.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
	
	@PostMapping("/apply/{jobId}")
	@PreAuthorize("hasAuthority('USER')")
	public Application apply(@PathVariable UUID jobId) {
		return appService.applyForJob(jobId);
	}
	
	@GetMapping("/job/{jobId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<Application> getByJob(@PathVariable UUID jobID){
		return appService.getByJob(jobID);
	}
	@GetMapping("/user/{userId}")
	@PreAuthorize("#userId.toString() == authentication.principal.id.toString() or hasAuthority('ADMIN')")
	public List<Application> getByUser(@PathVariable UUID userID){
		return appService.getByUser(userID);
	}
	@PutMapping("/status/{appId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Application updateStatus(@PathVariable UUID appId, @RequestParam String status) {
		return appService.updateStatus(appId,status);
	}

}
