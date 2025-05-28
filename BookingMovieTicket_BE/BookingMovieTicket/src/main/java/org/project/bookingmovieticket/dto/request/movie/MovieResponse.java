package org.project.bookingmovieticket.dto.request.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.entity.Genre;
import org.project.bookingmovieticket.entity.MovieDetail;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponse {
    private Long id;
    private String movieName;
    private int movieDuration;
    private String movieImage;
    private int movieStatus;
    private boolean status;

    private List<String> genreNames;
}
