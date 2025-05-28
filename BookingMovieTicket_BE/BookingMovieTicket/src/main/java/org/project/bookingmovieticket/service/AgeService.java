package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.age.AgeCreateRequest;
import org.project.bookingmovieticket.dto.request.age.AgeResponse;
import org.project.bookingmovieticket.dto.request.age.AgeUpdateRequest;
import org.project.bookingmovieticket.entity.Age;
import org.project.bookingmovieticket.repository.AgeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgeService {
    private final AgeRepository ageRepository;
    public AgeService(AgeRepository ageRepository) {
        this.ageRepository = ageRepository;
    }

    public Age createAge(AgeCreateRequest request) {
        Age age = new Age();
        age.setId(request.getId());
        age.setAgeType(request.getAgeType());
        age.setDescription(request.getDescription());
        return ageRepository.save(age);
    }

    public AgeResponse getAge(Long id) {
        Age age = ageRepository.findById(id).orElseThrow(() -> new RuntimeException("Age not found"));

        AgeResponse ageResponse = new AgeResponse();
        ageResponse.setId(age.getId());
        ageResponse.setAgeType(age.getAgeType());
        ageResponse.setDescription(age.getDescription());
        return ageResponse;
    }

    public List<AgeResponse> getAges() {
        return ageRepository.findAll().stream().map(age -> {
            AgeResponse ageResponse = new AgeResponse();
            ageResponse.setId(age.getId());
            ageResponse.setAgeType(age.getAgeType());
            ageResponse.setDescription(age.getDescription());
            return ageResponse;
        }).collect(Collectors.toList());
    }

    public Age updateAge(Long id, AgeUpdateRequest request) {
        Age age = new Age();
        age = ageRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("Age not found"));
        age.setAgeType(request.getAgeType());
        age.setDescription(request.getDescription());
        return ageRepository.save(age);
    }

    public void deleteAge(Long id) {
        ageRepository.deleteById(id);
    }
}
