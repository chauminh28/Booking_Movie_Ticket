package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.room.RoomCreateRequest;
import org.project.bookingmovieticket.dto.request.room.RoomResponse;
import org.project.bookingmovieticket.dto.request.room.RoomUpdateRequest;
import org.project.bookingmovieticket.entity.Room;
import org.project.bookingmovieticket.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
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

        return roomRepository.save(room);
    }

    public Page<RoomResponse> getRooms(String searchValue, Pageable pageable) {
        Page<Room> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = roomRepository.findAll(pageable);
        }
        else {
            page = roomRepository.findByRoomNameContainingIgnoreCase(searchValue, pageable);
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
}
