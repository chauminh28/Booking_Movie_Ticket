package org.project.bookingmovieticket.service;

import lombok.*;
import org.project.bookingmovieticket.dto.request.user.UserCreateRequest;
import org.project.bookingmovieticket.dto.request.user.UserResponse;
import org.project.bookingmovieticket.dto.request.user.UserUpdateRequest;
import org.project.bookingmovieticket.entity.Role;
import org.project.bookingmovieticket.entity.User;
import org.project.bookingmovieticket.repository.RoleRepository;
import org.project.bookingmovieticket.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User createUser(UserCreateRequest request) {
        User user = new User();

        user.setUserName(request.getUserName());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setLastName(request.getLastName());
        user.setFirstName(request.getFirstName());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setStatus(true);

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);

        return userRepository.save(user);
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    UserResponse dto = new UserResponse();
                    dto.setId(user.getId());
                    dto.setUserName(user.getUserName());
                    dto.setLastName(user.getLastName());
                    dto.setFirstName(user.getFirstName());
                    dto.setDob(user.getDob());
                    dto.setGender(user.getGender());
                    dto.setEmail(user.getEmail());
                    dto.setPhone(user.getPhone());
                    dto.setStatus(user.isStatus());
                    dto.setRoleName(user.getRole() != null ? user.getRole().getRoleName() : null);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUserName(user.getUserName());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setDob(user.getDob());
        response.setGender(user.getGender());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setStatus(user.isStatus());
        response.setRoleName(user.getRole() != null ? user.getRole().getRoleName() : null);

        return response;
    }

    public User updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserName(request.getUserName());
        user.setPassword(request.getPassword());
        user.setLastName(request.getLastName());
        user.setFirstName(request.getFirstName());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setStatus(true);

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);

        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
