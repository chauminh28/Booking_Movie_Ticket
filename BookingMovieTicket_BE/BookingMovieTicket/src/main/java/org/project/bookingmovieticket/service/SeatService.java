package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.seat.SeatCreateRequest;
import org.project.bookingmovieticket.dto.request.seat.SeatResponse;
import org.project.bookingmovieticket.dto.request.seat.SeatUpdateRequest;
import org.project.bookingmovieticket.entity.Seat;
import org.project.bookingmovieticket.repository.RoomRepository;
import org.project.bookingmovieticket.repository.SeatRepository;
import org.project.bookingmovieticket.repository.SeatTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {
    private final SeatRepository seatRepository;
    private final SeatTypeRepository seatTypeRepository;
    private final RoomRepository roomRepository;
    public SeatService(SeatRepository seatRepository, SeatTypeRepository seatTypeRepository, RoomRepository roomRepository) {
        this.seatRepository = seatRepository;
        this.seatTypeRepository = seatTypeRepository;
        this.roomRepository = roomRepository;
    }

    public List<SeatResponse> getAllSeatsByRoomId(Long roomId) {
        List<Seat> seats;
            seats = seatRepository.findByRoomId(roomId);
        return seats.stream().map(seat -> {
            SeatResponse seatResponse = new SeatResponse();
            seatResponse.setSeatId(seat.getId());
            seatResponse.setRoomId(seat.getRoom().getId());
            seatResponse.setSeatNumber(seat.getSeatNumber());
            seatResponse.setSeatCol(seat.getSeatCol());
            seatResponse.setSeatRow(seat.getSeatRow());
            seatResponse.setSeatTypeName(seat.getSeatType().getSeatTypeName());
            return seatResponse;
        }).toList();
    }

    public SeatResponse updateSeatType(Long seatId, SeatUpdateRequest request) {
        Seat seat = seatRepository.findById(seatId).orElseThrow(()->new RuntimeException("Seat Not Found"));
        seat.setSeatType(seatTypeRepository.findById(request.getSeatTypeId()).orElseThrow(()->new RuntimeException("Seat Type Not Found")));
        seatRepository.save(seat);
        SeatResponse seatResponse = new SeatResponse();
        seatResponse.setSeatId(seat.getId());
        seatResponse.setRoomId(seat.getRoom().getId());
        seatResponse.setSeatNumber(seat.getSeatNumber());
        seatResponse.setSeatCol(seat.getSeatCol());
        seatResponse.setSeatRow(seat.getSeatRow());
        seatResponse.setSeatTypeName(seat.getSeatType().getSeatTypeName());
        return seatResponse;
    }

    public SeatResponse createSeat(Long roomId, SeatCreateRequest request) {
        Seat seat = new Seat();
        seat.setRoom(roomRepository.findById(roomId).orElseThrow(()->new RuntimeException("Room Not Found")));
        seat.setSeatRow(request.getSeatRow());
        seat.setSeatCol(request.getSeatCol());
        seat.setSeatStatus(1);
        seat.setSeatNumber(request.getSeatNumber());
        seat.setSeatType(seatTypeRepository.findById(request.getSeatTypeId()).orElseThrow(()->new RuntimeException("Seat Type Not Found")));
        seatRepository.save(seat);

        SeatResponse seatResponse = new SeatResponse();
        seatResponse.setSeatId(seat.getId());
        seatResponse.setRoomId(roomId);
        seatResponse.setSeatNumber(seat.getSeatNumber());
        seatResponse.setSeatCol(seat.getSeatCol());
        seatResponse.setSeatRow(seat.getSeatRow());
        seatResponse.setSeatTypeName(seat.getSeatType().getSeatTypeName());
        return seatResponse;
    }

    public void deleteSeat(Long seatId) {
        seatRepository.deleteById(seatId);
    }
}
