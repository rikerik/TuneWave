package Erik.OnlineSong.Service;

import java.io.IOException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import Erik.OnlineSong.Model.User;

import Erik.OnlineSong.Repository.UserRepository;

@Service
public class UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder pwdEncoder;

    public UserProfileService(UserRepository userRepository, PasswordEncoder pwdEncoder) {
        this.userRepository = userRepository;
        this.pwdEncoder = pwdEncoder;
    }

    // Method for updating user profile details

    public void updateProfile(Integer userId, String firstName, String userName, String lastName, String password,
            MultipartFile profilePicture) throws IOException {

        // Fetch the user by id
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check the fields if they are empty or not
        if (firstName != null && !firstName.isEmpty()) {
            user.setFirstName(firstName);
        }

        if (lastName != null && !lastName.isEmpty()) {
            user.setLastName(lastName);
        }

        if (userName != null && !userName.isEmpty()) {
            user.setUsername(userName);
        }

        if (password != null && !password.isEmpty()) {
            user.setPassword(pwdEncoder.encode(password));
        }

        if (profilePicture != null && !profilePicture.isEmpty()) {
            byte[] imageBytes = profilePicture.getBytes();
            user.setUserImage(imageBytes);
        }

        // Save the modified user
        userRepository.save(user);
    }

}