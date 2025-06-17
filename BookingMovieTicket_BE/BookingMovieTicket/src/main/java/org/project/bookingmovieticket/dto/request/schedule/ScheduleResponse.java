package org.project.bookingmovieticket.dto.request.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.dto.request.showtime.ShowtimeResponse;
import org.project.bookingmovieticket.entity.Movie;
import org.project.bookingmovieticket.entity.Room;
import org.project.bookingmovieticket.entity.ScheduleDetail;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse {
    private Long id;
    private Long movieId;
    private String movieName;
    private Long roomId;
    private String roomName;
    private LocalDate scheduleDate;
    private boolean status;
    private List<ShowtimeResponse> showtimes;
}
