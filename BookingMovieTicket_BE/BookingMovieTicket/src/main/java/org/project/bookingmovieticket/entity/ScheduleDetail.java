package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class ScheduleDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "scheduleId")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "showTimeId")
    private ShowTime showTime;
}
