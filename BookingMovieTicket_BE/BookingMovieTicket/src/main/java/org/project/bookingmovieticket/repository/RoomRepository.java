package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.dto.request.room.RoomResponse;
import org.project.bookingmovieticket.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Page<Room> findByRoomNameContainingIgnoreCase(String roomName, Pageable pageable);
}
