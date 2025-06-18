package org.project.bookingmovieticket.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleId")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Role role;
}
