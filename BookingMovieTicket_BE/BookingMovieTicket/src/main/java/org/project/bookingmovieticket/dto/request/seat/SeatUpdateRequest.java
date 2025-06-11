package org.project.bookingmovieticket.dto.request.seat;

import lombok.Data;

@Data

public class SeatUpdateRequest {
    private Long seatId;
    private Long seatTypeId;
}
