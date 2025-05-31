package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Director;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {
    Page<Director> findByDirectorNameContainingIgnoreCase(String name, Pageable pageable);
}
