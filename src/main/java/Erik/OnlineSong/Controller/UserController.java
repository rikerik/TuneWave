package Erik.OnlineSong.Controller;

import org.springframework.web.bind.annotation.RestController;

import Erik.OnlineSong.Model.User;
import Erik.OnlineSong.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUsers(@PathVariable("id") String id) {
        return repository.findById(Integer.parseInt(id));
    }

}
