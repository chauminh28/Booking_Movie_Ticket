package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String roomName;
    private boolean status;
    @Column(columnDefinition = "nvarchar(255)")
    private String monitor;
    @Column(columnDefinition = "nvarchar(255)")
    private String soundSystem;
    private int rows;
    private int cols;

    @OneToMany(mappedBy = "room")
    private List<Schedule> scheduleDetails;
}
