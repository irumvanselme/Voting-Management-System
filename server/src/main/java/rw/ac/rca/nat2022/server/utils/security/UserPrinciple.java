package rw.ac.rca.nat2022.server.utils.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import rw.ac.rca.nat2022.server.models.User;
import rw.ac.rca.nat2022.server.models.enums.ERole;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPrinciple implements UserDetails {

    private Long id;

    private String fullNames;

    private String email;

    private String phoneNumber;

    private String nationalId;

    private String password;

    private ERole role = ERole.ADMIN;

    private Collection<? extends GrantedAuthority> authorities;


    public static UserPrinciple create(User user) {
        UserPrinciple userPrinciple = new UserPrinciple();

        userPrinciple.id = user.getId();
        userPrinciple.fullNames = user.getFullNames();
        userPrinciple.email = user.getEmail();
        userPrinciple.phoneNumber= user.getPhoneNumber();
        userPrinciple.nationalId= user.getNationalId();
        userPrinciple.password = user.getPassword();
        userPrinciple.role = user.getRole();
        userPrinciple.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()));

        return userPrinciple;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
