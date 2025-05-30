package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Genre;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    Page<Genre> findByGenreNameContainingIgnoreCase(String genreName, Pageable pageable);

}
