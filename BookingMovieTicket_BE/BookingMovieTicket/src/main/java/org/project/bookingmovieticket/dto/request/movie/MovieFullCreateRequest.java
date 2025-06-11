package org.project.bookingmovieticket.dto.request.movie;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MovieFullCreateRequest {
    @NotBlank(message = "Tên phim không được để trống")
    private String movieName;
    @Positive (message = "Thời lương phim phải là 1 số dương > 0")
    @NotNull(message = "Thời lượng phim không được để trống")
    private int movieDuration;
    private boolean status;

    private String movieImage;

    @NotNull(message = "Thể loại phim không được để trống")
    private List<Long> genres;

    @NotNull(message = "Trạng thái phim không được để trống")
    private int movieStatus;

    @NotNull(message = "Phim không hợp lệ hoặc đang để trống")
    private Long movieId;

    @NotBlank(message = "Quốc gia không hợp lệ hoặc đang để trống")
    private String country;

    @NotBlank(message = "Mô tả không được để trống")
    private String description;


    private String trailer;

    @NotNull(message = "Ngày khởi chiếu không được để trống")
    @FutureOrPresent(message = "Ngày khởi chiếu phải bắt đầu từ ngày hiện tại hoặc các ngày tiếp theo")
    private LocalDate startDate;

    @NotNull(message = "Giới hạn độ tuổi không hợp lệ hoặc đang để trống")
    private Long ageId;
}
