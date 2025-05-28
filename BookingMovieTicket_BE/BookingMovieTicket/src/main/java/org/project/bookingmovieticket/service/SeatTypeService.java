package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.repository.SeatTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class SeatTypeService {
    private SeatTypeRepository seatTypeRepository;

    public SeatTypeService(SeatTypeRepository seatTypeRepository) {
        this.seatTypeRepository = seatTypeRepository;
    }


}
