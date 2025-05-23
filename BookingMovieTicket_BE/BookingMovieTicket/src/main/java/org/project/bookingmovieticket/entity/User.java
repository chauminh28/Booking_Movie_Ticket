package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "[user]")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String password;
    private String lastName;
    private String firstName;
    private String email;
    private String phone;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;
}
