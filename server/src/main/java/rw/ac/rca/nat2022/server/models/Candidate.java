package rw.ac.rca.nat2022.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @JsonIgnore
    @OneToMany(mappedBy = "candidate")
    private List<Voter> votes = new ArrayList<>();

    public int getTotalVotes(){
        return votes.size();
    }
}
