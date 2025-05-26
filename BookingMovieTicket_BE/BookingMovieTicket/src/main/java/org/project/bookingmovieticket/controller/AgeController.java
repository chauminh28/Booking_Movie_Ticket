package org.project.bookingmovieticket.controller;

import org.project.bookingmovieticket.dto.request.age.AgeCreateRequest;
import org.project.bookingmovieticket.dto.request.age.AgeResponse;
import org.project.bookingmovieticket.dto.request.age.AgeUpdateRequest;
import org.project.bookingmovieticket.entity.Age;
import org.project.bookingmovieticket.service.AgeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ages")
public class AgeController {
    private final AgeService ageService;
    public AgeController(AgeService ageService) {
        this.ageService = ageService;
    }

    @PostMapping
    public Age addAge(@RequestBody AgeCreateRequest request) {
        return ageService.createAge(request);
    }

    @GetMapping
    public List<AgeResponse> getAges() {
        return ageService.getAges();
    }

    @GetMapping("{ageId}")
    public AgeResponse getAge(@PathVariable("ageId") Long id) {
        return ageService.getAge(id);
    }

    @PutMapping("{ageId}")
    public Age updateAge(@PathVariable("ageId") Long id,@RequestBody AgeUpdateRequest request) {
        return ageService.updateAge(id, request);
    }

    @DeleteMapping("{ageId}")
    public String deleteAge(@PathVariable("ageId") Long id) {
        ageService.deleteAge(id);
        return "Age has been deleted";
    }
}
