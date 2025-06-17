package org.project.bookingmovieticket.dto.request.moviedetail;

import lombok.Data;

import java.util.List;

@Data
public class MovieDetailUpdateActorRequest {
    private Long movieId;
    private List<Long> actors;
}
