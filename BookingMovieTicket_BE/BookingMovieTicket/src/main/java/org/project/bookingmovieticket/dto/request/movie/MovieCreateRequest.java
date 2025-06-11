package org.project.bookingmovieticket.dto.request.movie;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    @NotBlank(message = "Tên phim không được để trống")
    private String movieName;
    @Positive
    @NotNull(message = "Thời lượng phim không được để trống")
    private int movieDuration;
    private boolean status;

    private String movieImage;

    @NotNull(message = "Thể loại phim không được để trống")
    private List<Long> genres;

    @NotNull(message = "Trạng thái phim không được để trống")
    private int movieStatus;
}
