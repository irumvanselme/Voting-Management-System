package rw.ac.rca.nat2022.server.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Utility {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String encode(String password) {
        return passwordEncoder.encode(password);
    }
}
