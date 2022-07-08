package rw.ac.rca.nat2022.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.nat2022.server.models.User;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailOrPhoneNumber(String email, String username);

    Optional<User> findByEmail(String email);

    boolean existsByEmailOrPhoneNumberOrNationalId(String email, String phoneNumber, String id);
}
