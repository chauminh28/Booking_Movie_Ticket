package org.project.bookingmovieticket.dto.request.room;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RoomCreateRequest {
    private String roomName;
    private String monitor;
    private String soundSystem;
    private String projector;
    private int rows;
    private int cols;
    private LocalDate createAt;
    private boolean status;
}
