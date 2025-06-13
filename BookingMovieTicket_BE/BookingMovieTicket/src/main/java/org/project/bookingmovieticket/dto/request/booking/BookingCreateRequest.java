package org.project.bookingmovieticket.dto.request.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.dto.request.bookingproduct.BookingProductResponse;
import org.project.bookingmovieticket.entity.BookingService;
import org.project.bookingmovieticket.entity.Seat;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingCreateRequest {
    private Long userId;
    private Long scheduleId;
    private Long showTimeId;
    private Long roomId;
    private List<Long> seatIds;
    private List<BookingProductResponse> bookingServices;
    private int paymentStatus;
    private int ticketStatus;
}
