package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeRepository extends JpaRepository<ShowTime, Long> {
}
