package org.project.bookingmovieticket.service;

import org.project.bookingmovieticket.dto.request.actor.ActorCreateRequest;
import org.project.bookingmovieticket.dto.request.actor.ActorResponse;
import org.project.bookingmovieticket.dto.request.actor.ActorUpdateRequest;
import org.project.bookingmovieticket.entity.Actor;
import org.project.bookingmovieticket.repository.ActorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ActorService {
    private ActorRepository actorRepository;

    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public Actor createActor(ActorCreateRequest request) {
        return actorRepository.save(Actor.builder()
                        .actorName(request.getActorName())
                        .avatar(request.getAvatar())
                        .gender(request.getGender())
                        .country(request.getCountry())
                        .build());
    }

    public Page<ActorResponse> getActors(String searchValue, Pageable pageable) {
        Page<Actor> page;

        if(searchValue == null || searchValue.isEmpty()) {
            page = actorRepository.findAll(pageable);
        }
        else {
            page = actorRepository.findByActorNameContainingIgnoreCase(searchValue, pageable);
        }

        return page.map(actor -> {
            return ActorResponse.builder()
                    .id(actor.getId())
                    .actorName(actor.getActorName())
                    .avatar(actor.getAvatar())
                    .gender(actor.getGender())
                    .country(actor.getCountry())
                    .build();
        });
    }

    public ActorResponse getActor(Long id) {
        Actor actor = actorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Actor not found"));

        return ActorResponse.builder()
                .id(actor.getId())
                .actorName(actor.getActorName())
                .avatar(actor.getAvatar())
                .gender(actor.getGender())
                .country(actor.getCountry())
                .build();
    }

    public Actor updateActor(Long id, ActorUpdateRequest request) {
        Actor actor = actorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Actor not found"));

        actor.setActorName(request.getActorName());
        actor.setAvatar(request.getAvatar());
        actor.setGender(request.getGender());
        actor.setCountry(request.getCountry());

        return actorRepository.save(actor);
    }

    public void deleteActor(Long id) {
        actorRepository.deleteById(id);
    }
}
