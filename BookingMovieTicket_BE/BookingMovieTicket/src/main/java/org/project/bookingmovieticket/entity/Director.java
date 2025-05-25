package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String directorName;
    @Column(columnDefinition = "nvarchar(255)")
    private String avatar;
    private Gender gender;

    @ManyToMany(mappedBy = "directors")
    private List<MovieDetail> movies;
}