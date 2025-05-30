package org.project.bookingmovieticket.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.bookingmovieticket.enums.Gender;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String actorName;
    @Column(columnDefinition = "nvarchar(255)")
    private String avatar;
    private Gender gender;
    @Column(columnDefinition = "nvarchar(255)")
    private String country;
    @ManyToMany(mappedBy = "actors")
    private List<MovieDetail> movies;
}
