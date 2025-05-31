package org.project.bookingmovieticket.dto.request.director;

import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

@Data
public class DirectorCreateRequest {
    private String directorName;
    private String avatar;
    private Gender gender;
    private String country;
    
}
