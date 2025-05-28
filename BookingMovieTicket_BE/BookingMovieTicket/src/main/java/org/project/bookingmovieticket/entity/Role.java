package org.project.bookingmovieticket.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String roleName;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<User> users;
}
