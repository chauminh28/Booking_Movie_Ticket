package org.project.bookingmovieticket.dto.request.room;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RoomUpdateRequest {
    @Size(min = 1, max = 30, message = "Tên phòng chiếu phải có ít nhất 1 kí tự và nhiều nhất 30 kí tự")
    private String roomName;

    @NotBlank(message = "Không được để trống màn hình của phòng chiếu")
    private String monitor;

    @NotBlank(message = "Không được để trống hệ thống âm thanh của phòng chiếu")
    private String soundSystem;

    @NotBlank(message = "Không được để trống máy chiếu của phòng chiếu")
    private String projector;

    @Positive
    @Min(value = 8, message = "Phòng chiếu phải có ít nhất 8 hàng")
    @Max(value = 20, message = "Phòng chiếu được có nhiều nhất 20 hàng")
    private int rows;

    @Positive
    @Min(value = 8, message = "Phòng chiếu phải có ít nhất 8 cột")
    @Max(value = 20, message = "Phòng chiếu được có nhiều nhất 20 cột")
    private int cols;

    private LocalDate createAt;

    private boolean status;
}
