package org.project.bookingmovieticket.dto.request.seattype;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatTypeResponse {
    private long id;
    private String seatTypeName;
    private double price;
    private String description;
}
