package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String directorName;
    private String avatar;
    private Gender gender;

    @ManyToMany(mappedBy = "directors")
    private List<MovieDetail> movies;
}