package org.project.bookingmovieticket.dto.request.product;

import lombok.Data;
import org.project.bookingmovieticket.entity.ServiceType;

@Data
public class ProductUpdateRequest {
    private String serviceName;
    private double price;
    private String image;
    private Long serviceTypeId;
}
