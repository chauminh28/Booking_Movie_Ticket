package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.genre.GenreCreateRequest;
import org.project.bookingmovieticket.dto.request.genre.GenreResponse;
import org.project.bookingmovieticket.dto.request.genre.GenreUpdateRequest;
import org.project.bookingmovieticket.entity.Genre;
import org.project.bookingmovieticket.repository.GenreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Genre createGenre(GenreCreateRequest request) {
        Genre genre = new Genre();
        genre.setGenreName(request.getGenreName());

        return genreRepository.save(genre);
    }

    public Page<GenreResponse> getGenres(String searchValue, Pageable pageable) {
      Page<Genre> page;
      if (searchValue == null || searchValue.isEmpty()) {
        page = genreRepository.findAll(pageable);
      }
      else {
          page = genreRepository.findByGenreNameContainingIgnoreCase(searchValue, pageable);
      }
      return page.map(genre -> {
          GenreResponse dto = new GenreResponse();
          dto.setId(genre.getId());
          dto.setGenreName(genre.getGenreName());
          return dto;
      });
    }

    public List<GenreResponse> getListGenres() {
        return genreRepository.findAll().stream().map(genre -> {
            GenreResponse dto = new GenreResponse();
            dto.setId(genre.getId());
            dto.setGenreName(genre.getGenreName());
            return dto;
        }).collect(Collectors.toList());

    }
    public GenreResponse getGenre(Long id) {
        Genre genre = genreRepository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));
        GenreResponse dto = new GenreResponse();
        dto.setId(genre.getId());
        dto.setGenreName(genre.getGenreName());
        return dto;
    }

    public Genre updateGenre(Long id, GenreUpdateRequest request) {
        Genre genre = genreRepository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));
        genre.setGenreName(request.getGenreName());
        return genreRepository.save(genre);
    }

    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
}
