package org.project.bookingmovieticket.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.enums.Gender;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private Long roleId;
}
