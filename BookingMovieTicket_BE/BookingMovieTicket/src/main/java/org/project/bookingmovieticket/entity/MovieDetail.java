package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class MovieDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String country;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;
    @Column(columnDefinition = "nvarchar(255)")
    private String trailer;
    private LocalDate startDate;

    @OneToOne
    @JoinColumn(name = "movieId")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "ageId")
    private Age age;

    @ManyToMany
    @JoinTable(
            name = "Movie_Actor",
            joinColumns = @JoinColumn(name = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "actorId")
    )
    private List<Actor> actors;

    @ManyToMany
    @JoinTable(
            name = "Movie_Director",
            joinColumns = @JoinColumn(name = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "directorId")
    )
    private List<Director> directors;
}
