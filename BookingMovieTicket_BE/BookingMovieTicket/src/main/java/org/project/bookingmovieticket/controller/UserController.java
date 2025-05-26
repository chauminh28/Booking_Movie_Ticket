package org.project.bookingmovieticket.controller;

import lombok.*;
import org.project.bookingmovieticket.dto.request.user.UserCreateRequest;
import org.project.bookingmovieticket.dto.request.user.UserResponse;
import org.project.bookingmovieticket.dto.request.user.UserUpdateRequest;
import org.project.bookingmovieticket.entity.User;
import org.project.bookingmovieticket.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    User createUser(@RequestBody UserCreateRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    List<UserResponse> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    UserResponse getUser(@PathVariable("userId") Long id) {
        return userService.getUser(id);
    }

    @PutMapping("/{userId}")
    User updateUser(@PathVariable("userId") Long id,
                    @RequestBody UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable("userId") Long id) {
        userService.deleteUser(id);

        return "User has been deleted";
    }
}
