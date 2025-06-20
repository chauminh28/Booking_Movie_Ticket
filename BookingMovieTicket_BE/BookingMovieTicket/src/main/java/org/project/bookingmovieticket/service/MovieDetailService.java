package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailCreateRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailUpdateActorRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailUpdateDirectorRequest;
import org.project.bookingmovieticket.entity.Actor;
import org.project.bookingmovieticket.entity.Director;
import org.project.bookingmovieticket.entity.Movie;
import org.project.bookingmovieticket.entity.MovieDetail;
import org.project.bookingmovieticket.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieDetailService {
    private final MovieDetailRepository movieDetailRepository;
    private final ActorRepository actorRepository;
    private final DirectorRepository directorRepository;
    private final MovieRepository movieRepository;
    private final AgeRepository ageRepository;

    public MovieDetailService(MovieDetailRepository movieDetailRepository, ActorRepository actorRepository, DirectorRepository directorRepository, MovieRepository movieRepository, AgeRepository ageRepository) {
        this.movieDetailRepository = movieDetailRepository;
        this.actorRepository = actorRepository;
        this.directorRepository = directorRepository;
        this.movieRepository = movieRepository;
        this.ageRepository = ageRepository;
    }
    public List<MovieDetailResponse> getMovieDetails(String movieId) {
        return movieDetailRepository.findAll().stream().map(movie -> {
            MovieDetailResponse movieDetailResponse = new MovieDetailResponse();
            movieDetailResponse.setId(movie.getId());
            movieDetailResponse.setMovieId(movie.getMovie().getId());
            movieDetailResponse.setCountry(movie.getCountry());
            movieDetailResponse.setDescription(movie.getDescription());
            movieDetailResponse.setTrailer(movie.getTrailer());
            movieDetailResponse.setStartDate(movie.getStartDate());
            movieDetailResponse.setAgeName(movie.getAge().getAgeType());

            List<Long> actorIds = movie.getActors().stream().map(Actor::getId).toList();
            movieDetailResponse.setActors(actorIds);
            List<Long> directorIds = movie.getDirectors().stream().map(Director::getId).toList();
            movieDetailResponse.setDirectors(directorIds);
            return movieDetailResponse;
        }).collect(Collectors.toList());
    }

    public MovieDetailResponse createMovieDetail(MovieDetailCreateRequest request) {
        MovieDetail movieDetail = new MovieDetail();
        movieDetail.setMovie(movieRepository.findById(request.getMovieId()).orElse(null));
        movieDetail.setCountry(request.getCountry());
        movieDetail.setDescription(request.getDescription());
        movieDetail.setTrailer(request.getTrailer());
        movieDetail.setStartDate(request.getStartDate());
        movieDetail.setAge(ageRepository.findById(request.getAgeId()).orElse(null));
        movieDetail.setActors(actorRepository.findAllById(request.getActors()));
        movieDetail.setDirectors(directorRepository.findAllById(request.getDirectors()));
        movieDetailRepository.save(movieDetail);
        MovieDetailResponse movieDetailResponse = new MovieDetailResponse();
        movieDetailResponse.setId(movieDetail.getId());
        movieDetailResponse.setMovieId(movieDetail.getMovie().getId());
        movieDetailResponse.setCountry(movieDetail.getCountry());
        movieDetailResponse.setDescription(movieDetail.getDescription());
        movieDetailResponse.setTrailer(movieDetail.getTrailer());
        movieDetailResponse.setStartDate(movieDetail.getStartDate());
        movieDetailResponse.setAgeName(movieDetail.getAge().getAgeType());
        List<Long> actorIds = movieDetail.getActors().stream().map(Actor::getId).toList();
        movieDetailResponse.setActors(actorIds);
        List<Long> directorIds = movieDetail.getDirectors().stream().map(Director::getId).toList();
        movieDetailResponse.setDirectors(directorIds);
        return movieDetailResponse;
    }

    public MovieDetailResponse updateActors(MovieDetailUpdateActorRequest request) {
        Movie movie = movieRepository.findById(request.getMovieId()).orElse(null);
        MovieDetail movieDetail = movie.getMovieDetail();
        movieDetail.setActors(actorRepository.findAllById(request.getActors()));
        movieDetailRepository.save(movieDetail);
        MovieDetailResponse movieDetailResponse = new MovieDetailResponse();
        movieDetailResponse.setId(movieDetail.getId());
        movieDetailResponse.setMovieId(movieDetail.getMovie().getId());
        movieDetailResponse.setCountry(movieDetail.getCountry());
        movieDetailResponse.setDescription(movieDetail.getDescription());
        movieDetailResponse.setTrailer(movieDetail.getTrailer());
        movieDetailResponse.setStartDate(movieDetail.getStartDate());
        movieDetailResponse.setAgeName(movieDetail.getAge().getAgeType());
        List<Long> actorIds = movieDetail.getActors().stream().map(Actor::getId).toList();
        movieDetailResponse.setActors(actorIds);
        List<Long> directorIds = movieDetail.getDirectors().stream().map(Director::getId).toList();
        movieDetailResponse.setDirectors(directorIds);
        return movieDetailResponse;
    }

    public MovieDetailResponse updateDirector(MovieDetailUpdateDirectorRequest request) {
        Movie movie = movieRepository.findById(request.getMovieId()).orElse(null);
        MovieDetail movieDetail = movie.getMovieDetail();
        movieDetail.setDirectors(directorRepository.findAllById(request.getDirectors()));
        movieDetailRepository.save(movieDetail);
        MovieDetailResponse movieDetailResponse = new MovieDetailResponse();
        movieDetailResponse.setId(movieDetail.getId());
        movieDetailResponse.setMovieId(movieDetail.getMovie().getId());
        movieDetailResponse.setCountry(movieDetail.getCountry());
        movieDetailResponse.setDescription(movieDetail.getDescription());
        movieDetailResponse.setTrailer(movieDetail.getTrailer());
        movieDetailResponse.setStartDate(movieDetail.getStartDate());
        movieDetailResponse.setAgeName(movieDetail.getAge().getAgeType());
        List<Long> actorIds = movieDetail.getActors().stream().map(Actor::getId).toList();
        movieDetailResponse.setActors(actorIds);
        List<Long> directorIds = movieDetail.getDirectors().stream().map(Director::getId).toList();
        movieDetailResponse.setDirectors(directorIds);
        return movieDetailResponse;
    }
}
