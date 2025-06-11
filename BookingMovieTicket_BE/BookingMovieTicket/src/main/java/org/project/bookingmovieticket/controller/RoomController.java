package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.room.RoomCreateRequest;
import org.project.bookingmovieticket.dto.request.room.RoomResponse;
import org.project.bookingmovieticket.dto.request.room.RoomUpdateRequest;
import org.project.bookingmovieticket.dto.request.seat.SeatResponse;
import org.project.bookingmovieticket.entity.Room;
import org.project.bookingmovieticket.service.RoomService;
import org.project.bookingmovieticket.service.SeatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rooms")
public class RoomController {
    private RoomService roomService;
    private final SeatService seatService;
    public RoomController(RoomService roomService, SeatService seatService) {

        this.roomService = roomService;
        this.seatService = seatService;
    }

    @PostMapping
    Room createRoom(@RequestBody @Valid RoomCreateRequest request) {
        return roomService.createRoom(request);
    }

    @GetMapping
    Page<RoomResponse> getRooms(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return roomService.getRooms(searchValue, pageable);
    }

    @GetMapping("/{roomId}")
    RoomResponse getRoom(@PathVariable("roomId") Long id) {
        return roomService.getRoom(id);
    }


    @PutMapping("/{roomId}")
    Room updateRoom(@PathVariable("roomId") Long id, @RequestBody @Valid RoomUpdateRequest request) {
        return roomService.updateRoom(id, request);
    }

    @DeleteMapping("/{roomId}")
    String deleteRoom(@PathVariable("roomId") Long id) {
        roomService.deleteRoom(id);

        return "Room has been deleted";
    }
}
