package org.project.bookingmovieticket.dto.request.actor;

import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

@Data
public class ActorCreateRequest {
    private String actorName;
    private String avatar;
    private Gender gender;
    private String country;
}
