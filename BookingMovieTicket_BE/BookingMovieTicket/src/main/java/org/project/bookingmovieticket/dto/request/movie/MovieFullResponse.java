package org.project.bookingmovieticket.dto.request.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.dto.request.moviedetail.MovieDetailResponse;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieFullResponse {
    MovieResponse movie;
    MovieDetailResponse detail;
}
