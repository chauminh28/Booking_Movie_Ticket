package org.project.bookingmovieticket.dto.request.seattype;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SeatTypeUpdateRequest {
    @Size(min = 1, max = 50, message = "Tên loại ghế phải có ít nhất 1 kí tự và nhiều nhất 50 kí tự")
    private String seatTypeName;

    @Positive
    private double price;

    private String description;
}
