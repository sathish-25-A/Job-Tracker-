package com.JT.Job_Tracker.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.JT.Job_Tracker.model.Application;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, UUID> {
	 List<Application> findByJobId(UUID jobId);
	 List<Application> findByUserId(UUID userId);
	
	

}
