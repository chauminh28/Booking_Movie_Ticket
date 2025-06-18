package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUser_UserNameContainingIgnoreCase(String userName, Pageable pageable);
    Page<Booking> findByTicketStatus(int ticketStatus, Pageable pageable);
    Page<Booking> findByUser_UserNameContainingIgnoreCaseAndTicketStatus(String userName, int ticketStatus, Pageable pageable);

    @Query("SELECT b FROM Booking b WHERE b.schedule.id = :scheduleId AND b.room.id = :roomId AND b.showTime.id = :showTimeId")
    List<Booking> findBookedSeats(@Param("scheduleId") Long scheduleId,
                                  @Param("roomId") Long roomId,
                                  @Param("showTimeId") Long showTimeId);
}
