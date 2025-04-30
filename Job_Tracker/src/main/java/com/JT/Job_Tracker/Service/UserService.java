package com.JT.Job_Tracker.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.JT.Job_Tracker.dto.UpdateUserRequest;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.repo.UserRepo;
@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String UPLOAD_DIR = System.getProperty("user.home") + "/JobTrackerResumes";

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

    public User updateProfile(UUID userId, User updatedUser) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        user.setLocation(updatedUser.getLocation());
        user.setMobileNumber(updatedUser.getMobileNumber());
        user.setExperience(updatedUser.getExperience());
        user.setSkill(updatedUser.getSkill());
        user.setGender(updatedUser.getGender());
        user.setDob(updatedUser.getDob());
        user.setLanguage(updatedUser.getLanguage());
        user.setEducation(updatedUser.getEducation());

        return userRepo.save(user);
    }

    public String uploadResume(UUID userId, MultipartFile file) throws IOException {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        user.setResume(filePath.toString());
        userRepo.save(user);

        return filePath.toString();
    }



    public User getUserById(UUID userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }
}
