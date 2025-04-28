package com.JT.Job_Tracker.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    public String name;
    public String email;
    public String password;
}
