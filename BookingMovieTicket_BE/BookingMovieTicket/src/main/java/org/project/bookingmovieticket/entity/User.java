package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.project.bookingmovieticket.enums.Gender;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "[user]")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String userName;
    @Column(columnDefinition = "nvarchar(255)")
    private String password;
    @Column(columnDefinition = "nvarchar(255)")
    private String lastName;
    @Column(columnDefinition = "nvarchar(255)")
    private String firstName;
    private LocalDate dob;
    private Gender gender;
    @Column(columnDefinition = "nvarchar(255)")
    private String email;
    @Column(columnDefinition = "nvarchar(255)")
    private String phone;
    @Column(columnDefinition = "nvarchar(255)")
    private String avatar;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;
}
