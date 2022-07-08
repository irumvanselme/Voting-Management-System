package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rw.ac.rca.nat2022.server.models.Candidate;
import rw.ac.rca.nat2022.server.repositories.ICandidateRepisitory;
import rw.ac.rca.nat2022.server.services.ICandidateService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
public class CandidateServiceImpl implements ICandidateService {

    private final ICandidateRepisitory candidateRepisitory;


    public CandidateServiceImpl(ICandidateRepisitory candidateRepisitory) {
        this.candidateRepisitory = candidateRepisitory;
    }

    public Candidate save(Candidate candidate) {
        return candidateRepisitory.save(candidate);
    }

    public Candidate findById(Long id) {
        return candidateRepisitory.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public List<Candidate> findAll() {
        return candidateRepisitory.findAll();
    }

    public void changeProfile(MultipartFile document, Long id) {

        try {
            String filePath = "";

            Path path = Paths.get("/home/anselme/nat-mobile/data");

            filePath = id + "_" + document.getOriginalFilename();

            Files.copy(document.getInputStream(), path.resolve(Objects.requireNonNull(filePath)));


            Candidate candidate = findById(id);
            candidate.setProfilePicture(filePath);

            candidateRepisitory.save(candidate);
        } catch (Exception e) {
            e.printStackTrace();

            throw new RuntimeException("Error occurred while uploading file");
        }
    }

    public byte[] loadProfileImage(Long id) {
        try {
            Candidate candidate = findById(id);
            String filePath = candidate.getProfilePicture();
            Path path = Paths.get("/home/anselme/nat-mobile/data/" + filePath);
            Resource resource = new UrlResource(path.toUri());
            try {
                return Files.readAllBytes(path);
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("Error occurred while loading file");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error occurred while loading file");
        }
    }
}
