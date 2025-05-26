package org.project.bookingmovieticket.dto.request.genre;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenreResponse {
    private Long id;
    private String genreName;
}
