package org.project.bookingmovieticket.dto.request.actor;

import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

@Data
public class ActorUpdateRequest {
    private String actorName;
    private String avatar;
    private Gender gender;
    private String country;
}
