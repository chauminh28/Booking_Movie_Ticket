package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String serviceName;
    private double price;
    private String image;

    @ManyToOne
    @JoinColumn(name = "serviceTypeId")
    private ServiceType serviceType;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<BookingService> bookingServices;
}
