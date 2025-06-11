package org.project.bookingmovieticket.dto.request.director;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

@Data
public class DirectorUpdateRequest {
    @Size(min = 1, max = 20, message = "Tên đạo diễn phải có ít nhất 1 kí tự và nhỏ hơn 20 kí tự")
    private String directorName;
    private String avatar;

    @NotNull(message = "Không được để trống giới tính của đạo diễn")
    private Gender gender;

    @NotBlank(message = "Không được để trống quốc gia của đạo diễn")
    private String country;

}
