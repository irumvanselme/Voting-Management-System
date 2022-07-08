package rw.ac.rca.nat2022.server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String fullNames;

    private String phoneNumber;

    private String nationalId;

    private String profilePicture;

    private String missionStatement;
}
