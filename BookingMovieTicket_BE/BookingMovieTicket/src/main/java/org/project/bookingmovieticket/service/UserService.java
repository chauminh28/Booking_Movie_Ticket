package org.project.bookingmovieticket.service;

import lombok.*;
import org.project.bookingmovieticket.dto.request.user.UserCreateRequest;
import org.project.bookingmovieticket.dto.request.user.UserResponse;
import org.project.bookingmovieticket.dto.request.user.UserUpdateRequest;
import org.project.bookingmovieticket.entity.Role;
import org.project.bookingmovieticket.entity.User;
import org.project.bookingmovieticket.repository.RoleRepository;
import org.project.bookingmovieticket.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User createUser(UserCreateRequest request) {
        if(existsUser(request.getUserName())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

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

    public Page<UserResponse> getUsers(String searchValue, Pageable pageable, Boolean status) {
        Page<User> page;

        if ((searchValue == null || searchValue.isEmpty()) && status == null) {
            page = userRepository.findAll(pageable);
        } else if ((searchValue == null || searchValue.isEmpty())) {
            page = userRepository.findByStatus(status, pageable);
        } else if (status == null) {
            page = userRepository.findByUserNameContainingIgnoreCase(searchValue, pageable);
        } else {
            page = userRepository.findByUserNameContainingIgnoreCaseAndStatus(searchValue, status, pageable);
        }

        return page.map(user -> {
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
                    dto.setRoleId(user.getRole() != null ? user.getRole().getId() : null);
                    return dto;
                });
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
        response.setRoleId(user.getRole() != null ? user.getRole().getId() : null);

        return response;
    }

    public User updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserName(request.getUserName());
        user.setLastName(request.getLastName());
        user.setFirstName(request.getFirstName());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setStatus(request.isStatus());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);

        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public User updateStatusUser(Long userId, boolean status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(status);

        return userRepository.save(user);
    }

    public boolean existsUser(String username) {
        System.out.println(username);
        System.out.println(userRepository.existsByUserNameIgnoreCase(username));
        return userRepository.existsByUserNameIgnoreCase(username.trim());
    }

    public User updatePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }
}
