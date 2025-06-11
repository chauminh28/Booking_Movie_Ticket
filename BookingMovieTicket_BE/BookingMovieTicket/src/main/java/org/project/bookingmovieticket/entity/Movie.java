package org.project.bookingmovieticket.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
        private String movieName;
    private int movieDuration;
    private boolean status;
    @Column(columnDefinition = "nvarchar(255)")
    private String movieImage;
    private int movieStatus;

    @ManyToMany
    @JoinTable(
            name = "Movie_Genre",
            joinColumns = @JoinColumn(name = "movieId"),
            inverseJoinColumns = @JoinColumn(name = "genreId")
    )
    private List<Genre> genres;

    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    @JsonIgnore
    private MovieDetail movieDetail;

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    private List<Schedule> schedules;
}
