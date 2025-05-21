package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "[user]")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userName;
    private String password;
    private String fullName;
    private String email;
    private String phone;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;
}
