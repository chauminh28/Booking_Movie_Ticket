package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.dto.request.movie.MovieFullResponse;
import org.project.bookingmovieticket.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByMovieNameContainingIgnoreCase(String movieName, Pageable pageable);
    Page<Movie> findByMovieStatus(Integer status, Pageable pageable);
    Page<Movie> findByMovieNameContainingIgnoreCaseAndMovieStatus(String movieName,Integer status, Pageable pageable);
}
