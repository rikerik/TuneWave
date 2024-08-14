package Erik.OnlineSong.DTO;

import Erik.OnlineSong.Model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a user data transfer object.
 * When listing users only the necessary items will be sent
 */
@AllArgsConstructor
@Data
public class UserDTO {
    private Integer id;

    private String firstName;

    private String lastName;

    private String username;

    private Role role;
}
