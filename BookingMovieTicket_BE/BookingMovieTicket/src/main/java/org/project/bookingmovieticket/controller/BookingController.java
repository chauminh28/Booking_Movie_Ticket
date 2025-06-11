package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.booking.BookingResponse;
import org.project.bookingmovieticket.dto.request.bookingproduct.BookingProductCreateRequest;
import org.project.bookingmovieticket.entity.Booking;
import org.project.bookingmovieticket.entity.BookingService;
import org.project.bookingmovieticket.service.BookingProductService;
import org.project.bookingmovieticket.service.BookingServiceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bookings")
public class BookingController {
    private BookingServiceService bService;
    private BookingProductService bpService;

    public BookingController(BookingServiceService bookingService, BookingProductService bookingProductService) {
        this.bService = bookingService;
        this.bpService = bookingProductService;
    }

    @GetMapping
    public Page<BookingResponse> getBookings(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return bService.getBookings(searchValue, pageable);
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
}
