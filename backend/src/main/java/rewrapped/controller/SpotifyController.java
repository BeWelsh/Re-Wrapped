package rewrapped.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

  private final String CLIENT_ID = "0f36460fb586415ca4290ffdc712ea68";
  private final String CLIENT_SECRET = "8f7efe34265748668d254a3da349f30c";
  private final String REDIRECT_URI = "http://localhost:8080/callback";

  private Map<String, String> tokenStore = new HashMap<>(); // Temporary storage for tokens (replace with database for production)

  /**
   * Receives authorization code from frontend and exchanges it for access and refresh tokens.
   */
  @PostMapping("/exchange-code")
  public ResponseEntity<?> exchangeAuthorizationCode(@RequestBody Map<String, String> requestBody) {
    String authorizationCode = requestBody.get("code");

    if (authorizationCode == null || authorizationCode.isEmpty()) {
      return ResponseEntity.badRequest().body("Authorization code is missing.");
    }

    try {
      // Spotify token endpoint
      String tokenUrl = "https://accounts.spotify.com/api/token";

      // Request headers
      HttpHeaders headers = new HttpHeaders();
      headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET); // Use Client ID and Secret for Basic Authentication
      headers.add("Content-Type", "application/x-www-form-urlencoded");

      // Request body
      String body = "grant_type=authorization_code"
              + "&code=" + URLEncoder.encode(authorizationCode, StandardCharsets.UTF_8)
              + "&redirect_uri=" + URLEncoder.encode(REDIRECT_URI, StandardCharsets.UTF_8);

      HttpEntity<String> request = new HttpEntity<>(body, headers);

      // Make the POST request to Spotify
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

      // Parse and store the tokens
      String accessToken = (String) response.getBody().get("access_token");
      String refreshToken = (String) response.getBody().get("refresh_token");

      tokenStore.put("access_token", accessToken);
      tokenStore.put("refresh_token", refreshToken);

      // Return the tokens to the frontend for optional storage
      return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error exchanging authorization code: " + e.getMessage());
    }
  }

  /**
   * Refreshes the access token when it expires.
   */
  @GetMapping("/refresh-token")
  public ResponseEntity<?> refreshAccessToken() {
    String refreshToken = tokenStore.get("refresh_token");

    if (refreshToken == null) {
      return ResponseEntity.badRequest().body("No refresh token available.");
    }

    try {
      // Spotify token endpoint
      String tokenUrl = "https://accounts.spotify.com/api/token";

      // Request headers
      HttpHeaders headers = new HttpHeaders();
      headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);
      headers.add("Content-Type", "application/x-www-form-urlencoded");

      // Request body
      String body = "grant_type=refresh_token&refresh_token=" + URLEncoder.encode(refreshToken, StandardCharsets.UTF_8);

      HttpEntity<String> request = new HttpEntity<>(body, headers);

      // Make the POST request to Spotify
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

      // Update the access token in the store
      String newAccessToken = (String) response.getBody().get("access_token");
      tokenStore.put("access_token", newAccessToken);

      // Return the new token to the frontend (or use internally)
      return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error refreshing access token: " + e.getMessage());
    }
  }
  @GetMapping("/genres")
  public ResponseEntity<?> getUserGenres() {
    String accessToken = tokenStore.get("access_token");

    if (accessToken == null) {
      return ResponseEntity.badRequest().body("No access token available.");
    }

    try {
      // Spotify API endpoint for user's top artists
      String url = "https://api.spotify.com/v1/me/top/artists?limit=50";

      HttpHeaders headers = new HttpHeaders();
      headers.add("Authorization", "Bearer " + accessToken);

      HttpEntity<Void> request = new HttpEntity<>(headers);

      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);

      // Extract genres from the response
      List<Map<String, Object>> artists = (List<Map<String, Object>>) response.getBody().get("items");
      Map<String, Integer> genreCounts = new HashMap<>();

      for (Map<String, Object> artist : artists) {
        List<String> genres = (List<String>) artist.get("genres");
        for (String genre : genres) {
          genreCounts.put(genre, genreCounts.getOrDefault(genre, 0) + 1);
        }
      }

      // Return the genres and their counts
      return ResponseEntity.ok(genreCounts);

    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error fetching genres: " + e.getMessage());
    }
  }
}
