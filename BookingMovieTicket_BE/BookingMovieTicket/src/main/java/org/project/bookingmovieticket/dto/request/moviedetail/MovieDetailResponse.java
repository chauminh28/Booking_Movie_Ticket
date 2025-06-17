package org.project.bookingmovieticket.dto.request.moviedetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.dto.request.actor.ActorResponse;
import org.project.bookingmovieticket.dto.request.director.DirectorResponse;

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
    private List<Long> actors;
    private List<Long> directors;

}
