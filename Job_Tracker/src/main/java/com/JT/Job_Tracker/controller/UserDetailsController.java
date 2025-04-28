package com.JT.Job_Tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JT.Job_Tracker.Service.UserService;
import com.JT.Job_Tracker.dto.UpdateUserRequest;
import com.JT.Job_Tracker.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserDetailsController {

    @Autowired
    private UserService userService;

    // Endpoint to update user details (name, email, password)
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String token, @RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUserDetails(token, request);
        return ResponseEntity.ok(updatedUser);
    }

}
