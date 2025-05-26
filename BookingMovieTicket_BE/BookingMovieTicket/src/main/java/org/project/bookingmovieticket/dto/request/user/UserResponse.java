package org.project.bookingmovieticket.dto.request.user;

import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

import java.time.LocalDate;

@Data
public class UserResponse {
    private Long id;
    private String userName;
    private String lastName;
    private String firstName;
    private LocalDate dob;
    private Gender gender;
    private String email;
    private String phone;
    private boolean status;
    private String roleName;
}
