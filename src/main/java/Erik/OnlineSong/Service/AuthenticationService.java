package Erik.OnlineSong.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Erik.OnlineSong.Model.AuthenticationResponse;
import Erik.OnlineSong.Model.Token;
import Erik.OnlineSong.Model.User;
import Erik.OnlineSong.Repository.TokenRepository;
import Erik.OnlineSong.Repository.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder pwdEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    public AuthenticationService(UserRepository repository,
            PasswordEncoder pwdEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            TokenRepository tokenRepository) {
        this.repository = repository;
        this.pwdEncoder = pwdEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    public AuthenticationResponse register(User request) throws FileNotFoundException, IOException {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(pwdEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        user.setUserImage(loadPlaceHolderImage());

        user = repository.save(user);

        String jwt = jwtService.generateToken(user);

        // save generated token
        saveUserToken(user, jwt);

        return new AuthenticationResponse(jwt);

    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        // set previous token to logged out
        revokeAllTokensByUser(user);

        // save generated token
        saveUserToken(user, token);

        return new AuthenticationResponse(token);
    }

    private void saveUserToken(User user, String jwt) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    private void revokeAllTokensByUser(User user) {
        List<Token> validTokenListByUser = tokenRepository.findAllTokenByUser(user.getId());

        if (!validTokenListByUser.isEmpty()) {
            validTokenListByUser.forEach(t -> {
                t.setLoggedOut(true);
            });
        }
        tokenRepository.saveAll(validTokenListByUser);
    }

    private byte[] loadPlaceHolderImage() throws IOException {
        ClassPathResource resource = new ClassPathResource("placeholder.jpg");
        try (InputStream inputStream = resource.getInputStream()) {
            return inputStream.readAllBytes();
        }
    }

}
