package com.JT.Job_Tracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JT.Job_Tracker.dto.LoginRequest;
import com.JT.Job_Tracker.dto.LoginResponse;
import com.JT.Job_Tracker.dto.RegisterRequest;
import com.JT.Job_Tracker.jwt.JwtUtil;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.UserRepo;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	// Method to register a user
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		User user = new User();
		user.setEmail(request.email);
		user.setName(request.name);
		user.setPassword(passwordEncoder.encode(request.password));
		user.setRole(request.role);
		userRepo.save(user);
		return ResponseEntity.ok("Registered successfully");
	}

	// Method to login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		// Authenticate user credentials
		authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		// Fetch the user from the repository
		User user = userRepo.findByEmail(request.getEmail()).orElseThrow();

		// Prepare claims for the JWT token
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", user.getRole());
		claims.put("name", user.getName());
		claims.put("email", user.getEmail());
		claims.put("id", user.getId().toString());

		// Generate JWT token with claims
		String token = jwtUtil.generateToken(claims, user);

		// Return both token and user info in the response
		return ResponseEntity
				.ok(new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole()));
	}

}