package org.project.bookingmovieticket.dto.request.moviedetail;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class MovieDetailCreateRequest {
    private Long id;
    @NotNull(message = "Phim không hợp lệ hoặc đang để trống")
    private Long movieId;

    @NotBlank(message = "Quốc gia không hợp lệ hoặc đang để trống")
    private String country;

    private String description;


    private String trailer;

    @NotNull(message = "Ngày khởi chiếu không được để trống")
    @FutureOrPresent(message = "Ngày khởi chiếu phải bắt đầu từ ngày hiện tại hoặc các ngày tiếp theo")
    private LocalDate startDate;

    @NotNull(message = "Giới hạn độ tuổi không hợp lệ hoặc đang để trống")
    private Long ageId;

    private List<Long> actors;
    private List<Long> directors;

}
