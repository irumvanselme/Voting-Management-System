package rw.ac.rca.nat2022.server.controllers;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rw.ac.rca.nat2022.server.models.Candidate;
import rw.ac.rca.nat2022.server.services.impl.CandidateServiceImpl;

import javax.servlet.http.HttpServletResponse;

import javax.validation.Valid;
import java.nio.file.Path;
import java.nio.file.Paths;

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

    @PutMapping("/{id}/change-profile")
    public ResponseEntity<?> updateProfile(@RequestParam("diploma") MultipartFile document, @PathVariable Long id) {
        candidateService.changeProfile(document, id);

        return ResponseEntity.ok().body("Profile updated");
    }

    @GetMapping("/load/{filename}")
    public void loadProfileImage(HttpServletResponse response, @PathVariable String filename){
        try {

            Path path = Paths.get("/home/anselme/nat-mobile/data");

            Path file = path.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            response.setContentType(MediaType.IMAGE_JPEG_VALUE);
            IOUtils.copy(resource.getInputStream(), response.getOutputStream());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
