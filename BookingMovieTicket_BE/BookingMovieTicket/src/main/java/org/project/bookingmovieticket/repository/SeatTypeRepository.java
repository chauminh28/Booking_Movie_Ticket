package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.SeatType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {
    Page<SeatType> findBySeatTypeNameContainingIgnoreCase(String seatTypeName, Pageable pageable);
    SeatType findBySeatTypeName(String name);
}
