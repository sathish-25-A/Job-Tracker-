package com.JT.Job_Tracker.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class ApplicationInfo {
    private UUID applicationId;
    private UUID userId;
    private String userName;
    private UUID jobId;
    private String jobTitle;
    private String status;
}
