package com.JT.Job_Tracker.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.JT.Job_Tracker.dto.UpdateUserRequest;
import com.JT.Job_Tracker.model.User;
import com.JT.Job_Tracker.model.UserProfile;
import com.JT.Job_Tracker.repo.UserProfileRepo;
import com.JT.Job_Tracker.repo.UserRepo;


@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private UserProfileRepo profileRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final String UPLOAD_DIR = "C:\\Users\\tmachine\\Desktop"; // Specify your path here


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

<<<<<<< HEAD
    public UserProfile addOrUpdateProfile(UUID userId, UserProfile profile, MultipartFile resumeFile) throws IOException {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
=======


    public UserProfile updateProfile(UUID userId, UserProfile userProfileDTO) {
        // Find the user by ID
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
>>>>>>> 33df42531990e03f67c4b5e6790d4ea04230cfaf

        // Check if the user already has a profile
        Optional<UserProfile> existingProfileOpt = profileRepo.findByUserId(userId);
        
<<<<<<< HEAD
        // Update user data if the profile has changes
        if (profile.getUser() != null && profile.getUser().getName() != null) {
            user.setName(profile.getUser().getName());
        }

        // Get existing profile or create new one
        UserProfile existingProfile = profileRepo.findByUserId(userId).orElse(new UserProfile());
        existingProfile.setUser(user);

        // Set updated fields from profile
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setMobileNumber(profile.getMobileNumber());
        existingProfile.setExperience(profile.getExperience());
        existingProfile.setSkill(profile.getSkill());
        existingProfile.setGender(profile.getGender());
        existingProfile.setDob(profile.getDob());
        existingProfile.setLanguage(profile.getLanguage());
        existingProfile.setEducation(profile.getEducation());

        // Save resume if present
        if (resumeFile != null && !resumeFile.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + resumeFile.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            existingProfile.setResume(filePath.toString());  // Save the file path in the profile
        }

        // Save the updated profile
        return profileRepo.save(existingProfile);
=======
        UserProfile userProfile;
        if (existingProfileOpt.isPresent()) {
            // If the user has a profile, update it
            userProfile = existingProfileOpt.get();
        } else {
            // If the user doesn't have a profile, create a new one
            userProfile = new UserProfile();
            userProfile.setUser(user); // Associate user with the new profile
        }

        // Update the profile fields
        userProfile.setLocation(userProfileDTO.getLocation());
        userProfile.setMobileNumber(userProfileDTO.getMobileNumber());
        userProfile.setExperience(userProfileDTO.getExperience());
        userProfile.setSkill(userProfileDTO.getSkill());
        userProfile.setGender(userProfileDTO.getGender());
        userProfile.setDob(userProfileDTO.getDob());
        userProfile.setLanguage(userProfileDTO.getLanguage());
        userProfile.setEducation(userProfileDTO.getEducation());

        // Save the profile (either updated or newly created)
        return profileRepo.save(userProfile);
>>>>>>> 33df42531990e03f67c4b5e6790d4ea04230cfaf
    }
}