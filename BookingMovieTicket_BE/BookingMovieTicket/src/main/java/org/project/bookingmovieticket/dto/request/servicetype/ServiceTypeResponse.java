package org.project.bookingmovieticket.dto.request.servicetype;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceTypeResponse {
    private Long id;
    private String name;
}
