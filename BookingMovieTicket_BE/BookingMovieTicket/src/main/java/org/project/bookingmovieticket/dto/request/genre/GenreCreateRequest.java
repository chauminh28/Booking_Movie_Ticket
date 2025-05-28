package org.project.bookingmovieticket.dto.request.genre;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenreCreateRequest {
    private Long id;
    @NotBlank(message = "Tên thể loại không được để trống")
    private String genreName;
}
