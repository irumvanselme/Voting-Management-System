package rw.ac.rca.nat2022.server.services;

import rw.ac.rca.nat2022.server.models.User;

import java.util.List;

public interface IUserService {

    List<User> getAllUsers();

    User save(User user);

    User getLoggedInUser();
}
