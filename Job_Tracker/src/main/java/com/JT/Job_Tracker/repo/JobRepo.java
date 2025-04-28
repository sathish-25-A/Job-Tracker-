package com.JT.Job_Tracker.repo;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JT.Job_Tracker.model.Job;

public interface JobRepo extends JpaRepository<Job, UUID> {
}
