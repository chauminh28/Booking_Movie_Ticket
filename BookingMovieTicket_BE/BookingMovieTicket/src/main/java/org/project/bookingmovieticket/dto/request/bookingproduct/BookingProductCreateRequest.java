package org.project.bookingmovieticket.dto.request.bookingproduct;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.entity.Booking;
import org.project.bookingmovieticket.entity.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingProductCreateRequest {
    private Long bookingId;
    private Long productId;
    private int quantity;
}
