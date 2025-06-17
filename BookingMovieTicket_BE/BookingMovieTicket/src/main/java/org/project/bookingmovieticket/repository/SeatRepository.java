package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Seat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    Page<Seat> findByRoomIdAndSeatRowContainingIgnoreCase(Long roomId, String seatRow, Pageable pageable);
    List<Seat> findByRoomId(Long roomId);

    Seat findSetBySeatRowAndRoomId(String seatRow, Long roomId);
}