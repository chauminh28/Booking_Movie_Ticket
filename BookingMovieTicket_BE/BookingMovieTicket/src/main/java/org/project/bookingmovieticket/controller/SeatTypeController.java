package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.seattype.SeatTypeCreateRequest;
import org.project.bookingmovieticket.dto.request.seattype.SeatTypeResponse;
import org.project.bookingmovieticket.dto.request.seattype.SeatTypeUpdateRequest;
import org.project.bookingmovieticket.entity.SeatType;
import org.project.bookingmovieticket.service.SeatTypeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("seatTypes")
public class SeatTypeController {
    private SeatTypeService seatTypeService;

    public SeatTypeController(SeatTypeService seatTypeService) {
        this.seatTypeService = seatTypeService;
    }

    @PostMapping
    SeatType createSeatType(@RequestBody SeatTypeCreateRequest request) {
        return seatTypeService.createSeatType(request);
    }

    @GetMapping
    Page<SeatTypeResponse> getSeatTypes(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return seatTypeService.getSeatTypes(searchValue, pageable);
    }

    @GetMapping("/{seatTypeId}")
    SeatTypeResponse getSeatType(@PathVariable("seatTypeId") Long id) {
        return seatTypeService.getSeatType(id);
    }

    @PutMapping("/{seatTypeId}")
    SeatType updateSeatType(@PathVariable("seatTypeId") Long id, @RequestBody SeatTypeUpdateRequest request) {
        return seatTypeService.updateSeatType(id, request);
    }

    @DeleteMapping("/{seatTypeId}")
    String deleteSeatType(@PathVariable("seatTypeId") Long id) {
        seatTypeService.deleteSeatType(id);

        return "Seat type has been deleted";
    }
}
