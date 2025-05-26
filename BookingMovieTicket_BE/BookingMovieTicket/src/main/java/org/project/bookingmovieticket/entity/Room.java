package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String roomName;
    private boolean status;
    private LocalDate createAt;
    private String monitor;
    private String soundSystem;
    private String projector;
    private int rows;
    private int cols;

    @OneToMany(mappedBy = "room")
    private List<Schedule> scheduleDetails;
}
