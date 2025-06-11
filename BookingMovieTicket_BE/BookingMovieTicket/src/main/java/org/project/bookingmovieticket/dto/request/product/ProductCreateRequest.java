package org.project.bookingmovieticket.dto.request.product;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.project.bookingmovieticket.entity.ServiceType;

@Data
public class ProductCreateRequest {
    @Size(min = 1, max = 50, message = "Tên dịch vụ phải có ít nhất 1 kí tự và nhiều nhất 50 kí tự")
    private String serviceName;

    @NotNull(message = "Giá không được để trống")
    @Positive
    private double price;

    private String image;

    @NotNull(message = "Không được để trống loại dịch vụ")
    private Long serviceTypeId;
}
