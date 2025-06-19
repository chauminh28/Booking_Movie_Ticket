package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.booking.BookingCreateRequest;
import org.project.bookingmovieticket.dto.request.booking.BookingResponse;
import org.project.bookingmovieticket.dto.request.booking.BookingServiceResponse;
import org.project.bookingmovieticket.entity.*;
import org.project.bookingmovieticket.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceService {
    BookingRepository bookingRepository;
    ScheduleRepository scheduleRepository;
    UserRepository userRepository;
    ShowtimeRepository showtimeRepository;
    RoomRepository roomRepository;
    ProductRepository productRepository;
    SeatRepository seatRepository;
    BookingProductRepository bookingProductRepository;

    public BookingServiceService(BookingRepository bookingRepository, ScheduleRepository scheduleRepository
    , UserRepository userRepository, RoomRepository roomRepository, ShowtimeRepository showtimeRepository
    , ProductRepository productRepository, SeatRepository seatRepository, BookingProductRepository bookingProductRepository) {
        this.bookingRepository = bookingRepository;
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.showtimeRepository = showtimeRepository;
        this.productRepository = productRepository;
        this.seatRepository = seatRepository;
        this.bookingProductRepository = bookingProductRepository;
    }

    public Page<BookingResponse> getBookings(String searchValue, Pageable pageable, Integer status) {
        Page<Booking> page;

        if ((searchValue == null || searchValue.isEmpty()) && status == null) {
            page = bookingRepository.findAll(pageable);
        } else if ((searchValue == null || searchValue.isEmpty())) {
            page = bookingRepository.findByTicketStatus(status, pageable);
        } else if (status == null) {
            page = bookingRepository.findByUser_UserNameContainingIgnoreCase(searchValue, pageable);
        } else {
            page = bookingRepository.findByUser_UserNameContainingIgnoreCaseAndTicketStatus(searchValue, status, pageable);
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
                    .paymentStatus(booking.getPaymentStatus())
                    .totalMoney(booking.getTotalMoney())
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
                .paymentStatus(booking.getPaymentStatus())
                .totalMoney(booking.getTotalMoney())
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

    public Booking updateBookingPaymentStatus(Long id, int paymentStatus) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setPaymentStatus(paymentStatus);
        return bookingRepository.save(booking);
    }
    public Booking createBooking(BookingCreateRequest request) {

        System.out.println("UserId: " + request.getUserId());
        System.out.println("ScheduleId: " + request.getScheduleId());
        System.out.println("ShowTimeId: " + request.getShowTimeId());
        System.out.println("RoomId: " + request.getRoomId());
        System.out.println("SeatIds: " + request.getSeatIds());
        System.out.println("BookingServices: " + request.getBookingServices());

        Booking booking = new Booking();
        booking.setUser(userRepository.findById(request.getUserId()).orElseThrow());
        booking.setSchedule(scheduleRepository.findById(request.getScheduleId()).orElseThrow());
        booking.setShowTime(showtimeRepository.findById(request.getShowTimeId()).orElseThrow());
        booking.setRoom(roomRepository.findById(request.getRoomId()).orElseThrow());
        booking.setBookingTime(LocalDateTime.now());
        booking.setTicketStatus(request.getTicketStatus());
        booking.setTotalMoney(request.getTotalMoney());

        List<Seat> seats = seatRepository.findAllById(request.getSeatIds());
        booking.setSeats(seats);

        Booking savedBooking = bookingRepository.save(booking);

        List<BookingService> bookingServices = request.getBookingServices().stream().map(bsReq -> {
            BookingService bs = new BookingService();
            bs.setService(productRepository.findById(bsReq.getServiceId()).orElseThrow());
            bs.setQuantity(bsReq.getQuantity());
            bs.setBooking(savedBooking);
            return bs;
        }).collect(Collectors.toList());

        savedBooking.setBookingServices(bookingServices);

        bookingProductRepository.saveAll(bookingServices);
        return savedBooking;
    }

    public List<Booking> getBookingSeats(Long scheduleId, Long roomId, Long showTimeId) {

        return bookingRepository.findBookedSeats(scheduleId, roomId, showTimeId);
    }
}
