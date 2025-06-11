package org.project.bookingmovieticket.dto.request.seat;

import lombok.Data;

@Data
public class SeatCreateRequest {
    private Long roomId;
    private Long seatTypeId;
    private String seatNumber;
    private int seatStatus;
    private int seatCol;
    private String seatRow;
}
