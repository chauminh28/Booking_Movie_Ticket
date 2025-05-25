package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String serviceName;
    private double price;
    @Column(columnDefinition = "nvarchar(255)")
    private String image;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<BookingService> bookingServices;
}
