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
    @Column(columnDefinition = "nvarchar(255)")
    private String userName;
    @Column(columnDefinition = "nvarchar(255)")
    private String password;
    @Column(columnDefinition = "nvarchar(255)")
    private String lastName;
    @Column(columnDefinition = "nvarchar(255)")
    private String firstName;
    @Column(columnDefinition = "nvarchar(255)")
    private String email;
    @Column(columnDefinition = "nvarchar(255)")
    private String phone;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;
}
