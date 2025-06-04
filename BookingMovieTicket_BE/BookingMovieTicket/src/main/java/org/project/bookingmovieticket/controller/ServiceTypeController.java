package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeCreateRequest;
import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeResponse;
import org.project.bookingmovieticket.dto.request.servicetype.ServiceTypeUpdateRequest;
import org.project.bookingmovieticket.entity.ServiceType;
import org.project.bookingmovieticket.service.ServiceTypeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("serviceTypes")
public class ServiceTypeController {
    private ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

    @PostMapping
    public ServiceType createServiceType(@RequestBody @Valid ServiceTypeCreateRequest request) {
        return serviceTypeService.createServiceType(request);
    }

    @GetMapping
    public Page<ServiceTypeResponse> getServiceTypes(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return serviceTypeService.getServiceTypes(searchValue, pageable);
    }

    @GetMapping("/{serviceTypeId}")
    public ServiceTypeResponse getServiceTypeById(@PathVariable("serviceTypeId") Long id) {
        return serviceTypeService.getServiceType(id);
    }

    @PutMapping("/{serviceTypeId}")
    public ServiceType updateServiceType(@PathVariable("serviceTypeId") Long id, @RequestBody @Valid ServiceTypeUpdateRequest request) {
        return serviceTypeService.updateServiceType(id, request);
    }

    @DeleteMapping("/{serviceTypeId}")
    public String deleteServiceType(@PathVariable("serviceTypeId") Long id) {
        serviceTypeService.deleteServiceType(id);

        return "ServiceType has been deleted";
    }
}
