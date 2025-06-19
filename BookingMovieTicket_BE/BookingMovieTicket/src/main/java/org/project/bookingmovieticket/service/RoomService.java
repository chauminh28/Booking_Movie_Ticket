package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.room.RoomCreateRequest;
import org.project.bookingmovieticket.dto.request.room.RoomResponse;
import org.project.bookingmovieticket.dto.request.room.RoomUpdateRequest;
import org.project.bookingmovieticket.entity.Room;
import org.project.bookingmovieticket.entity.Seat;
import org.project.bookingmovieticket.repository.RoomRepository;
import org.project.bookingmovieticket.repository.SeatRepository;
import org.project.bookingmovieticket.repository.SeatTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final SeatTypeRepository seatTypeRepository;
    private final SeatRepository seatRepository;

    public RoomService(RoomRepository roomRepository, SeatTypeRepository seatTypeRepository, SeatRepository seatRepository) {
        this.roomRepository = roomRepository;
        this.seatTypeRepository = seatTypeRepository;
        this.seatRepository = seatRepository;
    }

    public Room createRoom(RoomCreateRequest request) {
        Room room = Room.builder()
                .createAt(request.getCreateAt())
                .roomName(request.getRoomName())
                .monitor(request.getMonitor())
                .soundSystem(request.getSoundSystem())
                .projector(request.getProjector())
                .rows(request.getRows())
                .cols(request.getCols())
                .status(request.isStatus())
                .build();
        roomRepository.save(room);
        int rows = room.getRows();
        int cols = room.getCols();
        for (int i = 0; i < rows; i++) {
            char rowChar = (char) ('A' + i);
            for (int j = 1; j <= cols; j++) {
                Seat seat = Seat.builder()
                        .seatRow(String.valueOf(rowChar))
                        .seatCol(j)
                        .seatNumber(String.valueOf(rowChar) + String.valueOf(j))
                        .seatType(seatTypeRepository.findBySeatTypeName("Standard"))
                        .room(roomRepository.findById(room.getId()).orElse(null))
                        .seatStatus(1)
                        .build();
                seatRepository.save(seat);
            }
        }
        return room;
    }

    public Page<RoomResponse> getRooms(String searchValue, Pageable pageable, Boolean status) {
        Page<Room> page;

        if ((searchValue == null || searchValue.isEmpty()) && status == null) {
            page = roomRepository.findAll(pageable);
        } else if ((searchValue == null || searchValue.isEmpty())) {
            page = roomRepository.findByStatus(status, pageable);
        } else if (status == null) {
            page = roomRepository.findByRoomNameContainingIgnoreCase(searchValue, pageable);
        } else {
            page = roomRepository.findByRoomNameContainingIgnoreCaseAndStatus(searchValue, status, pageable);
        }

        return page.map(room -> {
            return RoomResponse.builder()
                    .id(room.getId())
                    .roomName(room.getRoomName())
                    .monitor(room.getMonitor())
                    .soundSystem(room.getSoundSystem())
                    .projector(room.getProjector())
                    .rows(room.getRows())
                    .cols(room.getCols())
                    .createAt(room.getCreateAt())
                    .status(room.isStatus())
                    .build();
        });
    }

    public RoomResponse getRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return RoomResponse.builder()
                .roomName(room.getRoomName())
                .monitor(room.getMonitor())
                .soundSystem(room.getSoundSystem())
                .projector(room.getProjector())
                .rows(room.getRows())
                .cols(room.getCols())
                .createAt(room.getCreateAt())
                .status(room.isStatus())
                .build();
    }

    public Room updateRoom(Long id, RoomUpdateRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomName(request.getRoomName());
        room.setMonitor(request.getMonitor());
        room.setSoundSystem(request.getSoundSystem());
        room.setProjector(request.getProjector());
        room.setCols(request.getCols());
        room.setRows(request.getRows());
        room.setCreateAt(request.getCreateAt());
        room.setStatus(request.isStatus());

        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public Room updateStatus(Long id, boolean status) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setStatus(status);

        return roomRepository.save(room);
    }
}
