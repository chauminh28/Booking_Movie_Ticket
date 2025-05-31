package org.project.bookingmovieticket.dto.request.director;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.enums.Gender;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DirectorResponse {
    private Long id;
    private String directorName;
    private String avatar;
    private Gender gender;
    private String country;
}
