package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class BookingService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "serviceId")
    private Service service;

    private Integer quantity;
}
