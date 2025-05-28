package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailCreateRequest;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
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

            List<String> actorNames = movie.getActors().stream().map(Actor::getActorName).toList();
            movieDetailResponse.setActors(actorNames);
            List<String> directorNames = movie.getDirectors().stream().map(Director::getDirectorName).toList();
            movieDetailResponse.setDirectors(directorNames);
            return movieDetailResponse;
        }).collect(Collectors.toList());
    }

    public MovieDetail createMovieDetail(MovieDetailCreateRequest request) {
        MovieDetail movieDetail = new MovieDetail();
        movieDetail.setMovie(movieRepository.findById(request.getMovieId()).orElse(null));
        movieDetail.setCountry(request.getCountry());
        movieDetail.setDescription(request.getDescription());
        movieDetail.setTrailer(request.getTrailer());
        movieDetail.setStartDate(request.getStartDate());
        movieDetail.setAge(ageRepository.findById(request.getAgeId()).orElse(null));
        movieDetail.setActors(actorRepository.findAllById(request.getActors()));
        movieDetail.setDirectors(directorRepository.findAllById(request.getDirectors()));
        return movieDetailRepository.save(movieDetail);

    }
}
