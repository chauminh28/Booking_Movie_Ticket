package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String seatNumber;
    @Column(columnDefinition = "nvarchar(255)")
    private String seatStatus;
    private int seatRow;
    @Column(columnDefinition = "nvarchar(255)")
    private String seatCol;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "seatTypeId")
    private SeatType seatType;
}
