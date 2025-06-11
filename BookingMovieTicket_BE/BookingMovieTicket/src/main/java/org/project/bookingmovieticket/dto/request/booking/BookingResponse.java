package org.project.bookingmovieticket.dto.request.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.entity.*;
import org.project.bookingmovieticket.entity.BookingService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private String username;
    private String phone;
    private LocalDateTime bookingTime;
    private LocalDate scheduleTime;
    private String movieName;
    private LocalTime startTime;
    private List<String> seatNumbers;
    private String roomName;
    private int ticketStatus;
    private List<BookingServiceResponse> bookingServices;
}
