package org.project.bookingmovieticket.dto.request.movie;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotNull(message = "Phim không hợp lệ hoặc đang để trống")
    private Long movieId;

    @NotBlank(message = "Tên phim không được để trống")
    private String movieName;

    @NotNull(message = "Thời lượng phim không hợp lệ hoặc đang để trống")
    @Positive
    private int movieDuration;


    private boolean status;

    private String movieImage;

    @NotNull(message = "Thể loại phim không hợp lệ hoặc đang để trống")
    private List<Long> movieGenres;

    @NotNull(message = "Trạng thái phim không hợp lệ hoặc đang để trống")
    private int movieStatus;

    private String trailer;

    @NotBlank(message = "Mô tả phim không được để trống")
    private String description;

    @NotBlank(message = "Quốc gia phim không được để trống")
    private String country;

    @NotNull(message = "Ngày khởi chiếu không được để trống")
    @FutureOrPresent(message = "Ngày phải là ngày hiện tại hoặc những ngày tiếp theo")
    private LocalDate startDate;

    @NotNull(message = "Độ tuổi của phim không hợp lệ hoặc đang để trống")
    private Long ageId;
}
