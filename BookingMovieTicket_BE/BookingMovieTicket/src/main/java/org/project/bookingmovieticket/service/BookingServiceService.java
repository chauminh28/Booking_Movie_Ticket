package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.booking.BookingResponse;
import org.project.bookingmovieticket.dto.request.booking.BookingServiceResponse;
import org.project.bookingmovieticket.entity.Booking;
import org.project.bookingmovieticket.entity.Schedule;
import org.project.bookingmovieticket.entity.ScheduleDetail;
import org.project.bookingmovieticket.entity.Seat;
import org.project.bookingmovieticket.repository.BookingRepository;
import org.project.bookingmovieticket.repository.ScheduleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class BookingServiceService {
    BookingRepository bookingRepository;
    ScheduleRepository scheduleRepository;

    public BookingServiceService(BookingRepository bookingRepository, ScheduleRepository scheduleRepository) {
        this.bookingRepository = bookingRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public Page<BookingResponse> getBookings(String searchValue, Pageable pageable) {
        Page<Booking> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = bookingRepository.findAll(pageable);
        }
        else {
            page = bookingRepository.findByUser_UserNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(booking -> {
            return BookingResponse.builder()
                    .id(booking.getId())
                    .username(booking.getUser().getUserName())
                    .phone(booking.getUser().getPhone())
                    .bookingTime(booking.getBookingTime())
                    .scheduleTime(booking.getSchedule().getScheduleDate())
                    .movieName(booking.getSchedule().getMovie().getMovieName())
                    .roomName(booking.getSchedule().getRoom().getRoomName())
                    .startTime(booking.getShowTime().getTime())
                    .seatNumbers(booking.getSeats().stream()
                            .map(Seat::getSeatNumber)
                            .collect(Collectors.toList()))
                    .ticketStatus(booking.getTicketStatus())
                    .bookingServices(
                            booking.getBookingServices().stream()
                                    .map(bs -> BookingServiceResponse.builder()
                                            .serviceName(bs.getService().getServiceName())
                                            .price(bs.getService().getPrice())
                                            .quantity(bs.getQuantity())
                                            .build()
                                    ).collect(Collectors.toList())
                    )
                    .build();
        });
    }

    public BookingResponse getBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return BookingResponse.builder()
                .id(booking.getId())
                .username(booking.getUser().getUserName())
                .phone(booking.getUser().getPhone())
                .bookingTime(booking.getBookingTime())
                .scheduleTime(booking.getSchedule().getScheduleDate())
                .movieName(booking.getSchedule().getMovie().getMovieName())
                .roomName(booking.getSchedule().getRoom().getRoomName())
                .startTime(booking.getShowTime().getTime())
                .seatNumbers(booking.getSeats().stream()
                        .map(Seat::getSeatNumber)
                        .collect(Collectors.toList()))
                .ticketStatus(booking.getTicketStatus())
                .bookingServices(
                        booking.getBookingServices().stream()
                                .map(bs -> BookingServiceResponse.builder()
                                        .serviceName(bs.getService().getServiceName())
                                        .price(bs.getService().getPrice())
                                        .quantity(bs.getQuantity())
                                        .build()
                                ).collect(Collectors.toList())
                )
                .build();
    }

    public Booking updateBooking(Long id, int status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setTicketStatus(status);

        return bookingRepository.save(booking);
    }
}
