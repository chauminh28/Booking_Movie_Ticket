package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeCreateRequest;
import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeResponse;
import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeUpdateRequest;
import org.project.bookingmovieticket.entity.ServiceType;
import org.project.bookingmovieticket.repository.ServiceTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ServiceTypeService {
    private ServiceTypeRepository serviceTypeRepository;

    public ServiceTypeService(ServiceTypeRepository serviceTypeRepository) {
        this.serviceTypeRepository = serviceTypeRepository;
    }

    public ServiceType createServiceType(ServiceTypeCreateRequest request) {
        return serviceTypeRepository.save(ServiceType.builder()
                        .name(request.getName())
                        .build());
    }

    public Page<ServiceTypeResponse> getServiceTypes(String searchValue, Pageable pageable) {
        Page<ServiceType> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = serviceTypeRepository.findAll(pageable);
        }
        else {
            page = serviceTypeRepository.findByNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(serviceType -> {
            ServiceTypeResponse serviceTypeResponse = new ServiceTypeResponse();
            serviceTypeResponse.setId(serviceType.getId());
            serviceTypeResponse.setName(serviceType.getName());
            return serviceTypeResponse;
        });
    }

    public ServiceTypeResponse getServiceType(Long id) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        return ServiceTypeResponse.builder()
                .id(serviceType.getId())
                .name(serviceType.getName())
                .build();
    }

    public ServiceType updateServiceType(Long id, ServiceTypeUpdateRequest request) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service type not found"));

        serviceType.setName(request.getName());

        return serviceTypeRepository.save(serviceType);
    }

    public void deleteServiceType(Long id) {
        serviceTypeRepository.deleteById(id);
    }
}
