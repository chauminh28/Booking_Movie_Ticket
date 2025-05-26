package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "serviceType", cascade = CascadeType.ALL)
    private List<Service> services;
}
