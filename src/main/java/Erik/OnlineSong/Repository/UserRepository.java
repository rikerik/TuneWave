package Erik.OnlineSong.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Erik.OnlineSong.Model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
