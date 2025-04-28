package com.JT.Job_Tracker.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JT.Job_Tracker.model.User;

public interface UserRepo extends JpaRepository<User, UUID> {
	  Optional<User> findByEmail(String email);
}
