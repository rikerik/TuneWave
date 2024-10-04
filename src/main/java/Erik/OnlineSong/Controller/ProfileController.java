package Erik.OnlineSong.Controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import Erik.OnlineSong.Service.UserProfileService;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private UserProfileService profileService;

    public ProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Integer userId,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) {
        try {
            profileService.updateProfile(userId, firstName, lastName, password, profilePicture);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to update profile");
        }
    }

}
