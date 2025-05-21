package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String actorName;
    private String avatar;
    private Gender gender;

    @ManyToMany(mappedBy = "actors")
    private List<MovieDetail> movies;
}
