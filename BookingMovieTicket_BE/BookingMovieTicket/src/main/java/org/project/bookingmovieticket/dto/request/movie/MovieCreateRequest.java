package org.project.bookingmovieticket.dto.request.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.entity.Genre;
import org.project.bookingmovieticket.entity.MovieDetail;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class MovieCreateRequest {
    private Long id;
    private String movieName;
    private int movieDuration;
    private boolean status;
    private String movieImage;
    private List<Long> genres;
    private boolean movieStatus;
}
