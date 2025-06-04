package org.project.bookingmovieticket.dto.request.schedule;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class ScheduleUpdateRequest {
    private Long movieId;
    private Long roomId;
    private LocalDate scheduleDate;
    private List<Long> showtimes;
}
