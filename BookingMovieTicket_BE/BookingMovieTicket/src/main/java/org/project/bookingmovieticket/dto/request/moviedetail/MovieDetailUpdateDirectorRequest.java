package org.project.bookingmovieticket.dto.request.moviedetail;

import lombok.Data;

import java.util.List;

@Data
public class MovieDetailUpdateDirectorRequest {
    private Long movieId;
    private List<Long> directors;

}
