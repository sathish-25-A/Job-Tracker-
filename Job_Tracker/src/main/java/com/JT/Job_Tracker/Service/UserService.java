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



    public UserProfile addOrUpdateProfile(UUID userId, UserProfile profile, MultipartFile resumeFile) throws IOException {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) throw new RuntimeException("User not found!");

        User user = userOpt.get();
        
        if (profile.getUser() != null && profile.getUser().getName() != null) {
            user.setName(profile.getUser().getName());
        }

        // Get the profile for the user, or create a new one if it doesn't exist
        UserProfile existingProfile = profileRepo.findByUserId(userId).orElse(new UserProfile());
        existingProfile.setUser(user);

        // Set profile details from the input 'profile'
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setMobileNumber(profile.getMobileNumber());
        existingProfile.setExperience(profile.getExperience());
        existingProfile.setSkill(profile.getSkill());
        existingProfile.setGender(profile.getGender());
        existingProfile.setDob(profile.getDob());
        existingProfile.setLanguage(profile.getLanguage());
        existingProfile.setEducation(profile.getEducation());

        // Save resume file
        if (resumeFile != null && !resumeFile.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + resumeFile.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);  // Create the directory if it does not exist
            }

            Path filePath = uploadPath.resolve(filename);  // Create the file path
            Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);  // Save the file
            existingProfile.setResume(filePath.toString());  // Set the file path in the profile
        }

        // Save and return the updated or newly created profile
        return profileRepo.save(existingProfile);
    }

}

