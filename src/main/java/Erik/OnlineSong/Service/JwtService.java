package Erik.OnlineSong.Service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import Erik.OnlineSong.Model.User;
import Erik.OnlineSong.Repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // Manually generated secret key, used for signing and verifying jwts.
    // TODO
    // Key expires and logging in is impossible, should generate this automatically
    // or delete the token, have to check the proper way
    private static final String SECRET_KEY = "2bdcd096b8e5997403cc854c7894161f2fd24d38139c3417f4b3d28c7ed47557";

    private final TokenRepository tokenRepository;

    public JwtService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    /**
     * 
     * @param token Jwt token
     * @return Returns the username from the token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the userId from the JWT token.
     * 
     * @param token Jwt token
     * @return Returns the userId from the token
     */
    public Integer extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("UserId", Integer.class));
    }

    /**
     * Extracts the username and checks if the username is equals with the current
     * user's username and checks the token's expiration date
     * 
     * @param token Jwt token
     * @param user  Current user
     * @return Returns true if the token is not expired and username equals with the
     *         one in the token
     */
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);

        boolean isValidToken = tokenRepository.findByToken(token)
                .map(t -> !t.isLoggedOut()).orElse(false);

        return username.equals(user.getUsername()) && !isTokenExpired(token) && isValidToken;
    }

    /**
     * 
     * @param token Jwt token
     * @return Returns true if the token is not expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * 
     * @param token Jwt token
     * @return Returns the creation date of the token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a specific claim from the given JWT token by applying a provided
     * resolver function
     * 
     * @param <T>      the type of the claim to be extracted, defined by the
     *                 resolver function
     * @param token    the Jwt token from which claims are to be extracted
     * @param resolver resolver a function that takes the claims and returns the
     *                 desired claim of type <T>
     * @return returns the result of applying the resolver function to the extracted
     *         claims, of type <T>
     */
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    /**
     * Extracts all claims from the jwt token
     * 
     * @param token The jwt token from which to extract claims
     * @return Returns the claims extracted from the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Generates a jwt token for the given user.
     * 
     * This method creates a jwt token with the username as the subject, sets the
     * issued and expiration dates,
     * and signs the token using the signing key.
     * 
     * @param user The user fro whom the token is generated
     * @return Returns the generated jwt token as string
     */
    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("UserId", user.getId())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(getSigningKey())
                .compact();

    }

    /**
     * This method decodes a BASE64URL encoded secret key and creates a SecretKey
     * object
     * 
     * @return Returns the SecretKey for signing jwt tokens
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
