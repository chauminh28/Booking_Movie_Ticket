package org.project.bookingmovieticket.dto.request.actor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.enums.Gender;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActorResponse {
    private Long id;
    private String actorName;
    private String avatar;
    private Gender gender;
    private String country;
}
