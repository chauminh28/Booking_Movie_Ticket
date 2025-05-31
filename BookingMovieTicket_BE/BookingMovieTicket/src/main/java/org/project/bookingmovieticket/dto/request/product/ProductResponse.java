package org.project.bookingmovieticket.dto.request.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.entity.ServiceType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String serviceName;
    private double price;
    private String image;
    private Long serviceTypeId;
}
