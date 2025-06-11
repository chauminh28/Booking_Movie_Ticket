package org.project.bookingmovieticket.dto.request.servicetype;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ServiceTypeCreateRequest {
    @Size(min = 1, max = 50, message = "Tên loại dịch vụ phải có ít nhất 1 kí tự và nhiều nhất 50 kí tự")
    private String name;
}
