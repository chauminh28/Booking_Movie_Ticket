package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.movie.*;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailCreateRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailUpdateActorRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailUpdateDirectorRequest;
import org.project.bookingmovieticket.service.MovieDetailService;
import org.project.bookingmovieticket.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    public MovieResponse createMovie(@RequestBody @Valid MovieFullCreateRequest request) {
        return movieService.createMovie(request);
    }

    @PostMapping("/details")
    public MovieDetailResponse createMovieDetail(@RequestBody @Valid MovieDetailCreateRequest request) {
        return movieDetailService.createMovieDetail(request);
    }

    @GetMapping
    public Page<MovieFullResponse> getAllMovies(@RequestParam(value = "search", required = false) String searchValue,@RequestParam(value = "status", required = false) Integer status, Pageable pageable) {
        return movieService.gettAllMovies(searchValue, status, pageable);
    }

    @GetMapping("{movieId}")
    public MovieFullResponse getMovie(@PathVariable("movieId") Long movieId) {
        return movieService.getMovie(movieId);
    }

    @PutMapping("/details/{movieId}")
    public MovieFullUpdateRequest updateMovie(@PathVariable("movieId") Long movieId, @RequestBody @Valid MovieFullUpdateRequest request) {
        return movieService.updateMovie(movieId, request);
    }

    @PutMapping("/details/updateActor")
    public MovieDetailResponse updateMovieDetailActor(@RequestBody @Valid MovieDetailUpdateActorRequest request) {
        return movieDetailService.updateActors(request);
    }

    @PutMapping("/details/updateDirector")
    public MovieDetailResponse updateMovieDetailDirector(@RequestBody @Valid MovieDetailUpdateDirectorRequest request) {
        return movieDetailService.updateDirector(request);
    }


    @DeleteMapping("{movieId}")
    public String deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
        return "Movie deleted";
    }

}
