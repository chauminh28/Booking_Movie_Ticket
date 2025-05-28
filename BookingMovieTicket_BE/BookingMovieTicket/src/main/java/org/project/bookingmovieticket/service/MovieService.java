package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.movie.MovieCreateRequest;
import org.project.bookingmovieticket.dto.request.movie.MovieFullResponse;
import org.project.bookingmovieticket.dto.request.movie.MovieResponse;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
import org.project.bookingmovieticket.entity.*;
import org.project.bookingmovieticket.repository.GenreRepository;
import org.project.bookingmovieticket.repository.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    private final GenreRepository genreRepository;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    public Movie createMovie(MovieCreateRequest request) {
        Movie movie = new Movie();
        movie.setMovieName(request.getMovieName());
        movie.setMovieImage(request.getMovieImage());
        movie.setMovieDuration(request.getMovieDuration());

        movie.setStatus(request.isStatus());
        movie.setGenres(genreRepository.findAllById(request.getGenres()));
        return movieRepository.save(movie);
    }

    public Page<MovieFullResponse> gettAllMovies(Pageable pageable) {
        Page<Movie> movies = movieRepository.findAll(pageable);
        return movies.map(movie -> {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId(movie.getId());
            movieResponse.setMovieName(movie.getMovieName());
            movieResponse.setMovieDuration(movie.getMovieDuration());
            movieResponse.setMovieImage(movie.getMovieImage());
            movieResponse.setMovieStatus(movie.getMovieStatus());
            movieResponse.setStatus(movie.isStatus());
            // map genreNames nếu cần
            movieResponse.setGenreNames(
                    movie.getGenres().stream().map(Genre::getGenreName).toList()
            );
            MovieDetail movieDetail = movie.getMovieDetail();
            MovieDetailResponse movieDetailResponse = new MovieDetailResponse();
            if (movieDetail != null) {
                movieDetailResponse.setId(movieDetail.getId());
                movieDetailResponse.setMovieId(movie.getId());
                movieDetailResponse.setCountry(movieDetail.getCountry());
                movieDetailResponse.setDescription(movieDetail.getDescription());
                movieDetailResponse.setTrailer(movieDetail.getTrailer());
                movieDetailResponse.setStartDate(movieDetail.getStartDate());
                movieDetailResponse.setAgeName(movieDetail.getAge().getAgeType());
                movieDetailResponse.setActors(
                        movieDetail.getActors().stream().map(Actor::getActorName).toList()
                );
                movieDetailResponse.setDirectors(
                        movieDetail.getDirectors().stream().map(Director::getDirectorName).toList()
                );
            }
            return new MovieFullResponse(movieResponse, movieDetailResponse);
        });
    }
}
