package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.MovieDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDetailRepository extends JpaRepository<MovieDetail, Long> {
}
