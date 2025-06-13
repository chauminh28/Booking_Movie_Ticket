package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.BookingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingProductRepository extends JpaRepository<BookingService, Long> {
    Optional<BookingService> findByBookingIdAndServiceId(Long bookingId, Long serviceId);
}
