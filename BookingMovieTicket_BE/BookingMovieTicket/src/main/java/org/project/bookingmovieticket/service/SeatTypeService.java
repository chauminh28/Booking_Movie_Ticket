package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.seattype.SeatTypeCreateRequest;
import org.project.bookingmovieticket.dto.request.seattype.SeatTypeResponse;
import org.project.bookingmovieticket.dto.request.seattype.SeatTypeUpdateRequest;
import org.project.bookingmovieticket.entity.Seat;
import org.project.bookingmovieticket.entity.SeatType;
import org.project.bookingmovieticket.repository.SeatTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SeatTypeService {
    private SeatTypeRepository seatTypeRepository;

    public SeatTypeService(SeatTypeRepository seatTypeRepository) {
        this.seatTypeRepository = seatTypeRepository;
    }

    public SeatType createSeatType(SeatTypeCreateRequest request) {
        SeatType seatType = SeatType.builder()
                .seatTypeName(request.getSeatTypeName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();

        return seatTypeRepository.save(seatType);
    }

    public Page<SeatTypeResponse> getSeatTypes(String searchValue, Pageable pageable) {
        Page<SeatType> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = seatTypeRepository.findAll(pageable);
        }
        else {
            page = seatTypeRepository.findBySeatTypeNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(seatType -> {
            return SeatTypeResponse.builder()
                    .id(seatType.getId())
                    .seatTypeName(seatType.getSeatTypeName())
                    .price(seatType.getPrice())
                    .description(seatType.getDescription())
                    .build();
        });
    }

    public SeatTypeResponse getSeatType(Long id) {
        SeatType seatType = seatTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat type not found"));

        return SeatTypeResponse.builder()
                .id(seatType.getId())
                .seatTypeName(seatType.getSeatTypeName())
                .price(seatType.getPrice())
                .description(seatType.getDescription())
                .build();
    }

    public SeatType updateSeatType(Long id, SeatTypeUpdateRequest request) {
        SeatType seatType = seatTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat type not found"));

        seatType.setSeatTypeName(request.getSeatTypeName());
        seatType.setPrice(request.getPrice());
        seatType.setDescription(request.getDescription());

        return seatTypeRepository.save(seatType);
    }

    public void deleteSeatType(Long id) {
        seatTypeRepository.deleteById(id);
    }
}
