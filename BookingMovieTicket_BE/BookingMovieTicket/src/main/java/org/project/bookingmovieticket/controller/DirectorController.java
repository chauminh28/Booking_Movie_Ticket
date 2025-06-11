package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.director.DirectorCreateRequest;
import org.project.bookingmovieticket.dto.request.director.DirectorResponse;
import org.project.bookingmovieticket.dto.request.director.DirectorUpdateRequest;
import org.project.bookingmovieticket.entity.Director;
import org.project.bookingmovieticket.service.DirectorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("directors")
public class DirectorController {

    private DirectorService directorService;

    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @PostMapping
    public Director createDirector(@RequestBody @Valid DirectorCreateRequest request) {
        return directorService.createDirector(request);
    }

    @GetMapping
    Page<DirectorResponse> getDirectors(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable){
        return directorService.getDirectors(searchValue, pageable);
    }

    @GetMapping("{directorId}")
    public DirectorResponse getDirector(@PathVariable Long directorId) {
        return directorService.getDirector(directorId);
    }

    @PutMapping("{directorId}")
    public Director updateDirector(@PathVariable Long directorId, @RequestBody @Valid DirectorUpdateRequest request) {
        return directorService.updateDirector(directorId, request);
    }

    @DeleteMapping("{directorId}")
    public String deleteDirector(@PathVariable Long directorId) {
        directorService.deleteDirector(directorId);
        return "Director deleted";
    }
}
