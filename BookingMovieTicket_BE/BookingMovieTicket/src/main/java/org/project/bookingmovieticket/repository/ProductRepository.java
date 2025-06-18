package org.project.bookingmovieticket.repository;

import org.project.bookingmovieticket.entity.Product;
import org.project.bookingmovieticket.entity.ServiceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByServiceNameContainingIgnoreCase(String serviceName, Pageable pageable);
    Page<Product> findByServiceType(ServiceType serviceType, Pageable pageable);
    Page<Product> findByServiceNameContainingIgnoreCaseAndServiceType(String serviceName, ServiceType serviceType, Pageable pageable);
}
