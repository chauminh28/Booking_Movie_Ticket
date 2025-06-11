package org.project.bookingmovieticket.dto.request.schedule;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ScheduleCreateRequest {

    @NotNull (message = "Phim không hợp lệ hoặc đang để trống")
    private Long movieId;

    @NotNull(message = "Phòng không hợp lệ hoặc đang để trống")
    private Long roomId;

    @NotNull(message = "Ngày bắt đầu không hợp lệ hoặc đang để trống")
    @FutureOrPresent(message = "Ngày bắt đầu phải là ngày hiện tại hoặc các ngày tiếp theo")
    private LocalDate scheduleDate;

    private boolean status;

    @NotNull(message = "Giớ chiếu không hợp lệ hoặc đang để trống")
    private List<Long> showtimes;
}
