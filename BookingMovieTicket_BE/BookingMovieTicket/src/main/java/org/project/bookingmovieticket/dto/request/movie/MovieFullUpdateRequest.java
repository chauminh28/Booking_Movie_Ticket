package org.project.bookingmovieticket.dto.request.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieFullUpdateRequest {
    private Long id;
    private Long movieId;
    private String movieName;
    private int movieDuration;
    private boolean status;
    private String movieImage;
    private List<Long> movieGenres;
    private int movieStatus;
    private String trailer;
    private String description;
    private String country;
    private LocalDate startDate;
    private Long ageId;
}
