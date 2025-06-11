package org.project.bookingmovieticket.dto.request.seat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatResponse {
    private Long seatId;
    private Long roomId;
    private String seatNumber;
    private int seatCol;
    private String seatRow;
    private String seatTypeName;
}
