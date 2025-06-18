package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.booking.BookingCreateRequest;
import org.project.bookingmovieticket.dto.request.booking.BookingResponse;
import org.project.bookingmovieticket.dto.request.bookingproduct.BookingProductCreateRequest;
import org.project.bookingmovieticket.entity.Booking;
import org.project.bookingmovieticket.entity.BookingService;
import org.project.bookingmovieticket.entity.Seat;
import org.project.bookingmovieticket.service.BookingProductService;
import org.project.bookingmovieticket.service.BookingServiceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("bookings")
public class BookingController {
    private final BookingServiceService bookingServiceService;
    private BookingServiceService bService;
    private BookingProductService bpService;

    public BookingController(BookingServiceService bookingService, BookingProductService bookingProductService, BookingServiceService bookingServiceService) {
        this.bService = bookingService;
        this.bpService = bookingProductService;
        this.bookingServiceService = bookingServiceService;
    }

    @GetMapping
    public Page<BookingResponse> getBookings(@RequestParam(value = "search", required = false) String searchValue,
                                             @RequestParam(value = "status", required = false) Integer statusValue,
                                             Pageable pageable) {
        return bService.getBookings(searchValue, pageable, statusValue);
    }

    @GetMapping("/{id}")
    public BookingResponse getBooking(@PathVariable("id") long id) {
        return bService.getBooking(id);
    }

    @PostMapping("/{id}")
    public BookingService createBookingService(@PathVariable("id") long id, @RequestBody BookingProductCreateRequest request) {
        return bpService.createBookingProduct(id, request);
    }

    @PutMapping("/{id}")
    public Booking updateStatus(@PathVariable("id") long id, @RequestParam Integer status) {
        System.out.println(status);
        return bService.updateBooking(id, status);
    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingCreateRequest request) {
        return bService.createBooking(request);
    }

    @GetMapping("/booked-seats")
    public List<Long> getBookedSeats(
            @RequestParam Long scheduleId,
            @RequestParam Long roomId,
            @RequestParam Long showtimeId
    ) {
        System.out.println("scheduleId: " + scheduleId);
        System.out.println("roomId: " + roomId);
        System.out.println("showtimeId: " + showtimeId);
        List<Booking> bookings = bookingServiceService.getBookingSeats(scheduleId, roomId, showtimeId);

        return bookings.stream()
                .flatMap(b -> b.getSeats().stream())
                .map(Seat::getId)
                .distinct()
                .collect(Collectors.toList());
    }
}
