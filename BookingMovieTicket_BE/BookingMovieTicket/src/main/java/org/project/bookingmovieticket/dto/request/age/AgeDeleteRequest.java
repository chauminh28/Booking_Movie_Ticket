package org.project.bookingmovieticket.dto.request.age;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgeDeleteRequest {
    private long id;
    private String ageType;
    private String description;
}
