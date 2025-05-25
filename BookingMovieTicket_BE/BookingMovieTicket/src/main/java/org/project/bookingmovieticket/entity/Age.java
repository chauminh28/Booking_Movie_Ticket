package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
public class Age {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String ageType;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;
}
