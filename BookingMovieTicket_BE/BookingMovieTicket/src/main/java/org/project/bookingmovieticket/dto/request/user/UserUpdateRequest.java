package org.project.bookingmovieticket.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.project.bookingmovieticket.enums.Gender;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
