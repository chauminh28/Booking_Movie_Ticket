package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String movieName;
    private int movieDuration;
    private boolean status;
    private boolean movieStatus;

    @ManyToMany
    @JoinTable(
            name = "Movie_Genre",
            joinColumns = @JoinColumn(name = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "genreId")
    )
    private List<Genre> genres;

    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    private MovieDetail movieDetail;

    @OneToMany(mappedBy = "movie")
    private List<Schedule> schedules;
}
