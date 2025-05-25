package org.project.bookingmovieticket.dto.request.movie;

import org.project.bookingmovieticket.entity.Genre;
import org.project.bookingmovieticket.entity.MovieDetail;

import java.util.List;

public class MovieResponse {
    private Long id;
    private String movieName;
    private String movieDuration;
    private boolean status;

    private List<Genre> genres;
    private MovieDetail movieDetail;
}
