package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Age;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeRepository extends JpaRepository<Age, Long> {
}
