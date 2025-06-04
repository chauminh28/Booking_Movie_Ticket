package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Movie;
import org.project.bookingmovieticket.entity.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Page<Schedule> findByMovie_movieNameContainingIgnoreCase(String movieName, Pageable pageable);
}
