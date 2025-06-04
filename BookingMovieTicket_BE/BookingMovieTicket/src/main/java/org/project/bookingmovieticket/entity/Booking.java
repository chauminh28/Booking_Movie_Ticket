package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int ticketStatus;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "scheduleId")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "seatId")
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    private LocalDateTime bookingTime;
    private int paymentStatus;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingService> bookingServices;
}
