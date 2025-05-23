package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String seatNumber;
    private String seatStatus;
    private int seatRow;
    private String seatCol;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "seatTypeId")
    private SeatType seatType;
}
