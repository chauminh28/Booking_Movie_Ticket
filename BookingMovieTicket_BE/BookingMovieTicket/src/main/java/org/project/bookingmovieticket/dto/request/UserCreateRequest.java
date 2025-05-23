package org.project.bookingmovieticket.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    private String userName;
    private String password;
    private String lastName;
    private String firstName;
    private String email;
    private String phone;
    private boolean status;
    private long roleId;
}
