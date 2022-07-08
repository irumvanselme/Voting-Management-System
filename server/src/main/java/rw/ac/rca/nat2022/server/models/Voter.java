package rw.ac.rca.nat2022.server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "voters")
@PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
public class Voter extends User {

    @ManyToOne
    private Candidate candidate;
}
