package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.seat.SeatCreateRequest;
import org.project.bookingmovieticket.dto.request.seat.SeatResponse;
import org.project.bookingmovieticket.dto.request.seat.SeatUpdateRequest;
import org.project.bookingmovieticket.service.SeatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("seats")
public class SeatController {
    private final SeatService seatService;
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @PostMapping
    public SeatResponse createSeat(@RequestBody SeatCreateRequest request) {
        return seatService.createSeat(request);
    }

    @GetMapping("/{roomId}")
    List<SeatResponse> getSeat(@PathVariable("roomId") Long id) {
        return seatService.getAllSeatsByRoomId(id);
    }
    @PutMapping("/{seatId}")
    public SeatResponse updateSeat(@PathVariable Long seatId, @RequestBody SeatUpdateRequest request) {
        return seatService.updateSeatType(seatId, request);
    }

    @DeleteMapping("/{seatId}")
    public String deleteSeat(@PathVariable Long seatId) {
        seatService.deleteSeat(seatId);
        return "Seat Deleted Successfully";
    }

}
