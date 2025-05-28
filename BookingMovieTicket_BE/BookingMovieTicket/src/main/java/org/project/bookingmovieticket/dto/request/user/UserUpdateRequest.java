package org.project.bookingmovieticket.dto.request.user;

import lombok.*;
import org.project.bookingmovieticket.enums.Gender;

import java.time.LocalDate;

@Data
public class UserUpdateRequest {
    private String userName;
    private String password;
    private String lastName;
    private String firstName;
    private LocalDate dob;
    private Gender gender;
    private String email;
    private String phone;
    private boolean status;
    private long roleId;
}
