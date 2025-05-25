package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class SeatType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String seatTypeName;
    private double price;
}
