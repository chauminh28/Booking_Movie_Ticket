package org.project.bookingmovieticket.controller;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.project.bookingmovieticket.dto.request.authentication.AuthenticationRequest;
import org.project.bookingmovieticket.dto.request.authentication.IntrospectRequest;
import org.project.bookingmovieticket.dto.response.AuthenticationResponse;
import org.project.bookingmovieticket.dto.response.IntrospectResponse;
import org.project.bookingmovieticket.service.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    AuthenticationResponse authenticate(@RequestBody AuthenticationRequest request) {
        return authenticationService.authenticate(request);
    }

    @PostMapping("/token")
    IntrospectResponse authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        return authenticationService.introspect(request);
    }
}
