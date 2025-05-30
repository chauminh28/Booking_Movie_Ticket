package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.movie.*;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
import org.project.bookingmovieticket.entity.*;
import org.project.bookingmovieticket.repository.AgeRepository;
import org.project.bookingmovieticket.repository.GenreRepository;
import org.project.bookingmovieticket.repository.MovieDetailRepository;
import org.project.bookingmovieticket.repository.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    private final GenreRepository genreRepository;
    private final AgeRepository ageRepository;
    private final MovieDetailRepository movieDetailRepository;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository, AgeRepository ageRepository, MovieDetailRepository movieDetailRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
        this.ageRepository = ageRepository;
        this.movieDetailRepository = movieDetailRepository;
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

    public Page<MovieFullResponse> gettAllMovies(String searchValue, Pageable pageable) {
        Page<Movie> movies;
        if (searchValue == null || searchValue.isEmpty()) {
            movies = movieRepository.findAll(pageable);
        }
        else {
            movies = movieRepository.findByMovieNameContainingIgnoreCase(searchValue, pageable);
        }
        return movies.map(movie -> {
            MovieResponse movieResponse = new MovieResponse();
            movieResponse.setId(movie.getId());
            movieResponse.setMovieName(movie.getMovieName());
            movieResponse.setMovieDuration(movie.getMovieDuration());
            movieResponse.setMovieImage(movie.getMovieImage());
            movieResponse.setMovieStatus(movie.getMovieStatus());
            movieResponse.setStatus(movie.isStatus());
            // map genreNames nếu cần
            movieResponse.setGenres(
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
                        movieDetail.getActors().stream().map(Actor::getId).toList()
                );
                movieDetailResponse.setDirectors(
                        movieDetail.getDirectors().stream().map(Director::getId).toList()
                );
            }
            return new MovieFullResponse(movieResponse, movieDetailResponse);
        });
    }

    public MovieFullResponse getMovie(Long movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow( () -> new RuntimeException("Movie not found"));
        MovieDetail movieDetail = movie.getMovieDetail();

        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setId(movie.getId());
        movieResponse.setMovieName(movie.getMovieName());
        movieResponse.setMovieImage(movie.getMovieImage());
        movieResponse.setMovieDuration(movie.getMovieDuration());
        movieResponse.setMovieStatus(movie.getMovieStatus());
        movieResponse.setStatus(movie.isStatus());
        movieResponse.setGenres(
                movie.getGenres().stream().map(Genre::getGenreName).toList()
        );

        MovieDetailResponse movieDetailResponse = new MovieDetailResponse();

        movieDetailResponse.setId(movieDetail.getId());
        movieDetailResponse.setMovieId(movie.getId());
        movieDetailResponse.setCountry(movieDetail.getCountry());
        movieDetailResponse.setDescription(movieDetail.getDescription());
        movieDetailResponse.setTrailer(movieDetail.getTrailer());
        movieDetailResponse.setStartDate(movieDetail.getStartDate());
        movieDetailResponse.setAgeName(movieDetail.getAge().getAgeType());
        movieDetailResponse.setActors(
                movieDetail.getActors().stream().map(Actor::getId).toList()
        );
        movieDetailResponse.setDirectors(
                movieDetail.getDirectors().stream().map(Director::getId).toList()
        );
        return new MovieFullResponse(movieResponse, movieDetailResponse);
    }

    public MovieFullUpdateRequest updateMovie(Long movieId, MovieFullUpdateRequest request) {
        Movie movie = movieRepository.findById(movieId).orElseThrow( () -> new RuntimeException("Movie not found"));
        MovieDetail movieDetail = movie.getMovieDetail();

        movie.setMovieName(request.getMovieName());
        movie.setMovieDuration(request.getMovieDuration());
        movie.setMovieImage(request.getMovieImage());
        movie.setMovieStatus(request.getMovieStatus());
        movie.setStatus(movie.isStatus());
        System.out.println(request.getMovieGenres());
        movie.setGenres(genreRepository.findAllById(request.getMovieGenres()));
        movieRepository.save(movie);

        movieDetail.setCountry(request.getCountry());
        movieDetail.setDescription(request.getDescription());
        movieDetail.setTrailer(request.getTrailer());
        movieDetail.setStartDate(request.getStartDate());
        movieDetail.setAge(ageRepository.findById(request.getAgeId()).get());
        movieDetailRepository.save(movieDetail);


        MovieFullUpdateRequest movieFullUpdateRequest = new MovieFullUpdateRequest();
        movieFullUpdateRequest.setMovieId(movie.getId());
        movieFullUpdateRequest.setMovieName(request.getMovieName());
        movieFullUpdateRequest.setMovieDuration(request.getMovieDuration());
        movieFullUpdateRequest.setMovieImage(request.getMovieImage());
        movieFullUpdateRequest.setMovieStatus(request.getMovieStatus());
        movieFullUpdateRequest.setStatus(movie.isStatus());
        movieFullUpdateRequest.setCountry(request.getCountry());
        movieFullUpdateRequest.setDescription(request.getDescription());
        movieFullUpdateRequest.setTrailer(request.getTrailer());
        movieFullUpdateRequest.setStartDate(request.getStartDate());
        movieFullUpdateRequest.setMovieGenres(request.getMovieGenres());
        movieFullUpdateRequest.setAgeId(request.getAgeId());
        return movieFullUpdateRequest;
    }

    public void deleteMovie(Long movieId) {
        movieRepository.deleteById(movieId);
    }
}
