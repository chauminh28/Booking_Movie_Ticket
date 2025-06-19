package org.project.bookingmovieticket.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String oldPassword;

    @Size(min = 6, max = 18, message = "Password phải có ít nhất 6 kí tự và nhiều nhất 18 kí tự")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String newPassword;
}
