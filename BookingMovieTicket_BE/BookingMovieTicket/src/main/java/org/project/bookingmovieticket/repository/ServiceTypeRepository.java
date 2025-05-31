package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.ServiceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    Page<ServiceType> findByNameContainingIgnoreCase(String serviceTypeName, Pageable pageable);
}
