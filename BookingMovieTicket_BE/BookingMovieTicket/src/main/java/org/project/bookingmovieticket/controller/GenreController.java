package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.genre.GenreCreateRequest;
import org.project.bookingmovieticket.dto.request.genre.GenreResponse;
import org.project.bookingmovieticket.dto.request.genre.GenreUpdateRequest;
import org.project.bookingmovieticket.entity.Genre;
import org.project.bookingmovieticket.service.GenreService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @PostMapping
    public Genre createGenre(@RequestBody @Valid GenreCreateRequest request) {
        return genreService.createGenre(request);
    }

    @GetMapping
    public Page<GenreResponse> getAllGenres(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return genreService.getGenres(searchValue, pageable);
    }

    @GetMapping("{genreId}")
    public GenreResponse getGenreById(@PathVariable("genreId") Long id) {
        return genreService.getGenre(id);
    }

    @PutMapping("{genreId}")
    public Genre updateGenre(@PathVariable("genreId") Long id ,@RequestBody @Valid GenreUpdateRequest request) {
        return genreService.updateGenre(id, request);
    }

    @DeleteMapping("{genreId}")
    public String deleteGenre(@PathVariable("genreId") Long id) {
        genreService.deleteGenre(id);
        return "Genre has been deleted";
    }
}
