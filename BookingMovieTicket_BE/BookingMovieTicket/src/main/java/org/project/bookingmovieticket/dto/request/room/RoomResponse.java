package org.project.bookingmovieticket.dto.request.room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private long id;
    private String roomName;
    private String monitor;
    private String soundSystem;
    private String projector;
    private int rows;
    private int cols;
    private LocalDate createAt;
    private boolean status;
}
