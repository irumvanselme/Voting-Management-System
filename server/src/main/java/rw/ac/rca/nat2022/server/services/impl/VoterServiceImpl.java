package rw.ac.rca.nat2022.server.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.Candidate;
import rw.ac.rca.nat2022.server.models.User;
import rw.ac.rca.nat2022.server.models.Voter;
import rw.ac.rca.nat2022.server.repositories.ICandidateRepisitory;
import rw.ac.rca.nat2022.server.repositories.IVoterRepisitory;
import rw.ac.rca.nat2022.server.services.IVoterService;

@Service
public class VoterServiceImpl implements IVoterService {

    private final IVoterRepisitory voterRepisitory;
    private final ICandidateRepisitory candidateRepisitory;

    public VoterServiceImpl(IVoterRepisitory voterRepisitory, ICandidateRepisitory candidateRepisitory) {
        this.voterRepisitory = voterRepisitory;
        this.candidateRepisitory = candidateRepisitory;
    }

    public Voter save(User user) {
        Voter voter = new Voter();

        voter = (new ModelMapper()).map(user, Voter.class);

        return voterRepisitory.save(voter);
    }


    public boolean hasVoted(Long id) {
        Voter voter = voterRepisitory.findById(id).orElseThrow(() -> new RuntimeException("Voter not found"));

        return (voter.getCandidate() != null);
    }

    public void vote(Long id, Long candidateId){
        Voter voter = voterRepisitory.findById(id).orElseThrow(() -> new RuntimeException("Voter not found"));
        Candidate candidate = candidateRepisitory.findById(candidateId).orElseThrow(() -> new RuntimeException("Candidate not found"));

        if (voter.getCandidate() != null) {
            throw new RuntimeException("Voter has already voted");
        }

        voter.setCandidate(candidate);
        voterRepisitory.save(voter);
    }
}
