package org.project.bookingmovieticket.dto.request.actor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

@Data
public class ActorUpdateRequest {
    @Size(min = 1, max = 20, message = "Username phải có ít nhất 1 kí tự và nhỏ hơn 20 kí tự")
    private String actorName;

    private String avatar;

    @NotNull(message = "Không được để trống giới tính của diễn viên")
    private Gender gender;

    @NotBlank(message = "Không được để trống quốc gia của diễn viên")
    private String country;
}
