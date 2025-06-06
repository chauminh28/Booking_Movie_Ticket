package org.project.bookingmovieticket.controller;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.project.bookingmovieticket.dto.request.user.UserCreateRequest;
import org.project.bookingmovieticket.dto.request.user.UserResponse;
import org.project.bookingmovieticket.dto.request.user.UserUpdateRequest;
import org.project.bookingmovieticket.entity.User;
import org.project.bookingmovieticket.service.UserService;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.project.bookingmovieticket.validate.OnAdminCreate;
import org.project.bookingmovieticket.validate.OnRegister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@Slf4j
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Validated(OnRegister.class)
    @PostMapping
    User createUser(@RequestBody @Validated(OnRegister.class) UserCreateRequest request) {
        return userService.createUser(request);
    }

    @Validated(OnAdminCreate.class)
    @PostMapping("/admin")
    User createUserAdmin(@RequestBody @Validated(OnAdminCreate.class) UserCreateRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    Page<UserResponse> getUsers(@RequestParam(value = "search", required = false) String searchValue, Pageable pageable) {
//        var authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        log.info("Username: {}", authentication.getName());
//        log.info("Role: {}", authentication.getAuthorities());

        return userService.getUsers(searchValue, pageable);
    }

    @GetMapping("/{userId}")
    UserResponse getUser(@PathVariable("userId") Long id) {
        return userService.getUser(id);
    }

    @Validated(OnAdminCreate.class)
    @PutMapping("/{userId}")
    User updateUser(@PathVariable("userId") Long id,
                    @RequestBody @Validated(OnAdminCreate.class) UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);

        return "User has been deleted";
    }
}
