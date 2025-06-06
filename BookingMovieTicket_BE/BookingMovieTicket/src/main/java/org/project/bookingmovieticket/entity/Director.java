package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String directorName;
    @Column(columnDefinition = "nvarchar(255)")
    private String avatar;
    private Gender gender;
    @Column(columnDefinition = "nvarchar(255)")
    private String country;

    @ManyToMany(mappedBy = "directors")
    private List<MovieDetail> movies;
}