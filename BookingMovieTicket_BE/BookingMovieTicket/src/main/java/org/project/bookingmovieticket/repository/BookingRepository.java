package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUser_UserNameContainingIgnoreCase(String userName, Pageable pageable);
}
