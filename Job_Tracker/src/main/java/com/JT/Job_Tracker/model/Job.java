package com.JT.Job_Tracker.model;


import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "jobs")
@Data
public class Job {

    @Id
    @GeneratedValue
    private UUID id;
    
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String location;
    private String company;
    private String jobType;
    private String salary;

    

}
