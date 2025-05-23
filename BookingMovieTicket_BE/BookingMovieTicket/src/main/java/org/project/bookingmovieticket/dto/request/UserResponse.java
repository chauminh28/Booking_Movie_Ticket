package org.project.bookingmovieticket.dto.request;

import lombok.Data;

@Data
public class UserResponse {
    private String userName;
    private String lastName;
    private String firstName;
    private String email;
    private String phone;
    private boolean status;
    private String roleName;
}
