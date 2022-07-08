package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.User;
import rw.ac.rca.nat2022.server.models.enums.ERole;
import rw.ac.rca.nat2022.server.repositories.IUserRepository;
import rw.ac.rca.nat2022.server.services.IUserService;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    private final VoterServiceImpl voterService;

    public UserServiceImpl(IUserRepository userRepository, VoterServiceImpl voterService) {
        this.userRepository = userRepository;
        this.voterService = voterService;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        if (userRepository.existsByEmailOrPhoneNumberOrNationalId(user.getEmail(), user.getPhoneNumber(), user.getNationalId())) {
            throw new RuntimeException("User already registered");
        }

        if (user.getRole() == ERole.VOTER) {
            return voterService.save(user);
        }

        return userRepository.save(user);
    }

    @Override
    public User getLoggedInUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser")
            throw new RuntimeException("You are not logged in, try to log in");

        String email;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return userRepository.findByEmailOrPhoneNumber(email, email).orElseThrow(
                () -> new RuntimeException("User not found with email"));
    }
}
