package org.project.bookingmovieticket.dto.request.schedule;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ScheduleCreateRequest {
    private Long movieId;
    private Long roomId;
    private LocalDate scheduleDate;
    private boolean status;
    private List<Long> showtimes;
}
