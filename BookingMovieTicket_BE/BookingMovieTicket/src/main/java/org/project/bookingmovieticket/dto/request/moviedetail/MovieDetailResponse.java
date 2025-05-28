package org.project.bookingmovieticket.dto.request.moviedetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MovieDetailResponse {
    private Long id;
    private Long movieId;
    private String country;
    private String description;
    private String trailer;
    private LocalDate startDate;
    private String ageName;
    private List<String> actors;
    private List<String> directors;

}
