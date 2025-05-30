package org.project.bookingmovieticket.dto.request.moviedetail;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MovieDetailUpdateRequest {
    private Long id;
    private Long movieId;
    private String country;
    private String description;
    private String trailer;
    private LocalDate startDate;
    private Long ageId;
    private List<Long> actors;
    private List<Long> directors;

}
