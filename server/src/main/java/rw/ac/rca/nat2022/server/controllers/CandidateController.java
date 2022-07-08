package rw.ac.rca.nat2022.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.models.Candidate;
import rw.ac.rca.nat2022.server.services.impl.CandidateServiceImpl;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateServiceImpl candidateService;

    public CandidateController(CandidateServiceImpl candidateService) {
        this.candidateService = candidateService;
    }

    //getallcandidates
    @GetMapping
    public ResponseEntity<?> getall() {
        return ResponseEntity.ok(candidateService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Candidate candidate) {
        return ResponseEntity.accepted().body(candidateService.save(candidate));
    }
}
