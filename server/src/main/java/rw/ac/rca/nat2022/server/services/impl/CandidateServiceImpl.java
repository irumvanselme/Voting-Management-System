package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.Candidate;
import rw.ac.rca.nat2022.server.repositories.ICandidateRepisitory;
import rw.ac.rca.nat2022.server.services.ICandidateService;

import java.util.List;

@Service
public class CandidateServiceImpl implements ICandidateService {

    private final ICandidateRepisitory candidateRepisitory;


    public CandidateServiceImpl(ICandidateRepisitory candidateRepisitory) {
        this.candidateRepisitory = candidateRepisitory;
    }

    public Candidate save(Candidate candidate){
        return candidateRepisitory.save(candidate);
    }

    public Candidate findById(Long id){
        return candidateRepisitory.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public List<Candidate> findAll(){
        return candidateRepisitory.findAll();
    }
}
