package rw.ac.rca.nat2022.server.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.models.User;
import rw.ac.rca.nat2022.server.models.enums.ERole;
import rw.ac.rca.nat2022.server.services.IUserService;
import rw.ac.rca.nat2022.server.utils.ApiResponse;
import rw.ac.rca.nat2022.server.utils.Utility;
import rw.ac.rca.nat2022.server.utils.dtos.LoginDTO;
import rw.ac.rca.nat2022.server.utils.dtos.RegisterDTO;
import rw.ac.rca.nat2022.server.utils.security.JwtTokenProvider;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final IUserService userService;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(IUserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getPassword()));

        String jwt = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok().body(ApiResponse.success(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = new ModelMapper().map(registerDTO, User.class);

        user.setPassword(Utility.encode(registerDTO.getPassword()));

        user.setRole(ERole.VOTER);

        return ResponseEntity.ok().body(userService.save(user));
    }

    @PostMapping("/register-as-admin")
    public ResponseEntity<?> registerAsAdmin(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = new ModelMapper().map(registerDTO, User.class);

        user.setPassword(Utility.encode(registerDTO.getPassword()));

        user.setRole(ERole.ADMIN);

        return ResponseEntity.ok().body(userService.save(user));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile() {
        User profile = userService.getLoggedInUser();

        return ResponseEntity.ok().body(profile);
    }
}
