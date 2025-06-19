package org.project.bookingmovieticket.dto.request.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.project.bookingmovieticket.enums.Gender;
import org.project.bookingmovieticket.validate.OnAdminCreate;
import org.project.bookingmovieticket.validate.OnRegister;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @Size(min = 6, max = 12, message = "Username phải có ít nhất 6 kí tự và nhiều nhất 12 kí tự", groups = {OnRegister.class, OnAdminCreate.class})
    private String userName;

    @Size(min = 6, max = 18, message = "Password phải có ít nhất 6 kí tự và nhiều nhất 18 kí tự")
    @NotBlank(message = "Mật khẩu không được để trống", groups = OnRegister.class)
    private String password;

    @Size(min = 3, max = 20, message = "Họ người dùng phải có ít nhất 3 kí tự và nhiều nhất 20 kí tự", groups = {OnRegister.class, OnAdminCreate.class})
    private String lastName;

    @Size(min = 1, max = 12, message = "Tên người dùng phải có ít nhất 1 kí tự và nhiều nhất 12 kí tự", groups = {OnRegister.class, OnAdminCreate.class})
    private String firstName;

    @NotNull(message = "Ngày sinh người dùng không được để trống", groups = {OnRegister.class, OnAdminCreate.class})
    @PastOrPresent(message = "Ngày sinh người dùng phải là ngày hiện tại hoặc trước", groups = {OnRegister.class, OnAdminCreate.class})
    private LocalDate dob;

    @NotNull(message = "Không được để trống giới tính của người dùng", groups = {OnRegister.class, OnAdminCreate.class})
    private Gender gender;

    @NotBlank(message = "Email không được để trống", groups = {OnRegister.class, OnAdminCreate.class})
    @Email(message = "Email không đúng định dạng", groups = {OnRegister.class, OnAdminCreate.class})
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống", groups = {OnRegister.class, OnAdminCreate.class})
    @Pattern(regexp = "^(0[3|5|7|8|9])[0-9]{8}$", message = "Số điện thoại không hợp lệ", groups = {OnRegister.class, OnAdminCreate.class})
    private String phone;

    @NotNull(message = "Role của người dùng không được để trống", groups = {OnRegister.class, OnAdminCreate.class})
    private long roleId;

    private boolean status;
}