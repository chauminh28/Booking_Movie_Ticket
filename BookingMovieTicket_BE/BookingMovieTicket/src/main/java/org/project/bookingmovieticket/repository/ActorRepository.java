package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Actor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Long> {
    Page<Actor> findByActorNameContainingIgnoreCase(String actorName, Pageable pageable);
}
