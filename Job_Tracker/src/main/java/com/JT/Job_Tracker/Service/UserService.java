package com.JT.Job_Tracker.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.JT.Job_Tracker.dto.UpdateUserRequest;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User updateUserDetails(String token, UpdateUserRequest request) {
		  
        String email = extractEmailFromJwt(token);

       
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        
        if (request.getName() != null) user.setName(request.getName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPassword() != null) user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepo.save(user);
    }

   
    private String extractEmailFromJwt(String token) {
        
        return token.substring(7);
    }

}
