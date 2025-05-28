package org.project.bookingmovieticket.dto.request.seattype;

import lombok.Data;

@Data
public class SeatTypeUpdateRequest {
    private String seatTypeName;
    private double price;
    private String description;
}
