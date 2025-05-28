package org.project.bookingmovieticket.dto.request.genre;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenreDeleteRequest {
    private Long id;
    private String genreName;
}
