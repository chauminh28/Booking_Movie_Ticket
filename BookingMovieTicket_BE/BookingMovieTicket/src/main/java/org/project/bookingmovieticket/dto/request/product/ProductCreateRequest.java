package org.project.bookingmovieticket.dto.request.product;

import lombok.Data;
import org.project.bookingmovieticket.entity.ServiceType;

@Data
public class ProductCreateRequest {
    private String serviceName;
    private double price;
    private String image;
    private Long serviceTypeId;
}
