package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String actorName;
    @Column(columnDefinition = "nvarchar(255)")
    private String avatar;
    private Gender gender;

    @ManyToMany(mappedBy = "actors")
    private List<MovieDetail> movies;
}
