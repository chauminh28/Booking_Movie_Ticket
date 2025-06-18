package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String username);
    Page<User> findByUserNameContainingIgnoreCase(String username, Pageable pageable);
    Page<User> findByStatus(Boolean status, Pageable pageable);
    Page<User> findByUserNameContainingIgnoreCaseAndStatus(String username, Boolean status, Pageable pageable);
    Boolean existsByUserNameIgnoreCase(String username);
    User findById(long id);
}
