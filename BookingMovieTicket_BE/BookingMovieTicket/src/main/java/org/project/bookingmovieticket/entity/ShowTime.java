package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.List;

@Entity
public class ShowTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalTime time;

    @OneToMany(mappedBy = "showTime", cascade = CascadeType.ALL)
    private List<ScheduleDetail> scheduleDetails;
}
