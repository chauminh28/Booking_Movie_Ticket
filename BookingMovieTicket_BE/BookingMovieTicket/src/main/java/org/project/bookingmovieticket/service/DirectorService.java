package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.director.DirectorCreateRequest;
import org.project.bookingmovieticket.dto.request.director.DirectorResponse;
import org.project.bookingmovieticket.dto.request.director.DirectorUpdateRequest;
import org.project.bookingmovieticket.entity.Director;
import org.project.bookingmovieticket.repository.DirectorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DirectorService {
    private DirectorRepository directorRepository;

    public DirectorService(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    public Director createDirector(DirectorCreateRequest request) {
        Director director = new Director();
        director.setDirectorName(request.getDirectorName());
        director.setAvatar(request.getAvatar());
        director.setGender(request.getGender());
        director.setCountry(request.getCountry());
        return directorRepository.save(director);
    }

    public Page<DirectorResponse> getDirectors(String searchValue, Pageable pageable) {
        Page<Director> page;
        if (searchValue == null || searchValue.isEmpty()) {
            page = directorRepository.findAll(pageable);
        }
        else {
            page = directorRepository.findByDirectorNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(director -> {
            DirectorResponse directorResponse = new DirectorResponse();
            directorResponse.setId(director.getId());
            directorResponse.setDirectorName(director.getDirectorName());
            directorResponse.setAvatar(director.getAvatar());
            directorResponse.setGender(director.getGender());
            directorResponse.setCountry(director.getCountry());
            return directorResponse;
        });
    }

    public DirectorResponse getDirector(Long id) {
        Director director = directorRepository.findById(id).orElseThrow(() -> new RuntimeException("Director not found"));
        DirectorResponse directorResponse = new DirectorResponse();
        directorResponse.setId(director.getId());
        directorResponse.setDirectorName(director.getDirectorName());
        directorResponse.setAvatar(director.getAvatar());
        directorResponse.setGender(director.getGender());
        directorResponse.setCountry(director.getCountry());
        return directorResponse;
    }

    public Director updateDirector(Long id, DirectorUpdateRequest request) {
        Director director = directorRepository.findById(id).orElseThrow(() -> new RuntimeException("Director not found"));

        director.setDirectorName(request.getDirectorName());
        director.setAvatar(request.getAvatar());
        director.setGender(request.getGender());
        director.setCountry(request.getCountry());
        return directorRepository.save(director);
    }

    public void deleteDirector(Long id) {
        directorRepository.deleteById(id);
    }
}
