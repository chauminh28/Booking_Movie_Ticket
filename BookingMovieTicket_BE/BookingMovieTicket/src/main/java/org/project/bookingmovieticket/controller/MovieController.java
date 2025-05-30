package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.movie.MovieCreateRequest;
import org.project.bookingmovieticket.dto.request.movie.MovieFullResponse;
import org.project.bookingmovieticket.dto.request.movie.MovieFullUpdateRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailCreateRequest;
import org.project.bookingmovieticket.entity.Movie;
import org.project.bookingmovieticket.entity.MovieDetail;
import org.project.bookingmovieticket.service.MovieDetailService;
import org.project.bookingmovieticket.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final MovieDetailService movieDetailService;
    public MovieController(MovieService movieService, MovieDetailService movieDetailService) {
        this.movieService = movieService;
        this.movieDetailService = movieDetailService;
    }

    @PostMapping
    public Movie createMovie(@RequestBody MovieCreateRequest request) {
        return movieService.createMovie(request);
    }

    @PostMapping("/details")
    public MovieDetail createMovieDetail(@RequestBody MovieDetailCreateRequest request) {
        return movieDetailService.createMovieDetail(request);
    }

    @GetMapping
    public Page<MovieFullResponse> getAllMovies(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return movieService.gettAllMovies(searchValue, pageable);
    }

    @GetMapping("{movieId}")
    public MovieFullResponse getMovie(@PathVariable("movieId") Long movieId) {
        return movieService.getMovie(movieId);
    }

    @PutMapping("/details/{movieId}")
    public MovieFullUpdateRequest updateMovie(@PathVariable("movieId") Long movieId, @RequestBody MovieFullUpdateRequest request) {
        return movieService.updateMovie(movieId, request);

    }

    @DeleteMapping("{movieId}")
    public String deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
        return "Movie deleted";
    }

}
