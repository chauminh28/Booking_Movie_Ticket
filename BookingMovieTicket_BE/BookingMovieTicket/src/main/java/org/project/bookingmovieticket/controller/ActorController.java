package org.project.bookingmovieticket.controller;

import jakarta.validation.Valid;
import org.project.bookingmovieticket.dto.request.actor.ActorCreateRequest;
import org.project.bookingmovieticket.dto.request.actor.ActorResponse;
import org.project.bookingmovieticket.dto.request.actor.ActorUpdateRequest;
import org.project.bookingmovieticket.entity.Actor;
import org.project.bookingmovieticket.service.ActorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("actors")
public class ActorController {
    private ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @PostMapping
    Actor createActor(@RequestBody @Valid ActorCreateRequest request) {
        System.out.println("Avatar:" + request.getAvatar());
        return actorService.createActor(request);
    }

    @GetMapping
    Page<ActorResponse> getActors(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
        return actorService.getActors(searchValue, pageable);
    }

    @GetMapping("/{actorId}")
    ActorResponse getActor(@PathVariable("actorId") Long id) {
        return actorService.getActor(id);
    }

    @PutMapping("/{actorId}")
    Actor updateActor(@PathVariable("actorId") Long id, @RequestBody @Valid ActorUpdateRequest request) {
        return actorService.updateActor(id, request);
    }

    @DeleteMapping("/{actorId}")
    String deleteActor(@PathVariable("actorId") Long id) {
        actorService.deleteActor(id);

        return "Actor has been deleted";
    }
}
