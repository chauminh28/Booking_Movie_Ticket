package org.project.bookingmovieticket.dto.request.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingServiceResponse {
    private String serviceName;
    private double price;
    private int quantity;
}
