package rw.ac.rca.nat2022.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.services.impl.VoterServiceImpl;

@RestController
@RequestMapping("/api/voters")
public class VoterController {

    private final VoterServiceImpl voterService;

    @Autowired
    public VoterController(VoterServiceImpl voterService) {
        this.voterService = voterService;
    }

    @GetMapping("/{id}/has-voted")
    public ResponseEntity<?> hasVoted(@PathVariable Long id) {
        return ResponseEntity.ok().body(voterService.hasVoted(id));
    }

    @PostMapping("/{id}/vote/{candidateId}")
    public ResponseEntity<?> vote(@PathVariable Long candidateId, @PathVariable Long id) {

        voterService.vote(id, candidateId);

        return ResponseEntity.ok().body("Done");
    }
}
