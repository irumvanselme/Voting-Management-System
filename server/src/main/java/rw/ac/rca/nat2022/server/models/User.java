package rw.ac.rca.nat2022.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import rw.ac.rca.nat2022.server.models.enums.ERole;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String fullNames;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String nationalId;

    @JsonIgnore
    private String password;

    private String address;

    @Enumerated(EnumType.STRING)
    private ERole role = ERole.ADMIN;
}
