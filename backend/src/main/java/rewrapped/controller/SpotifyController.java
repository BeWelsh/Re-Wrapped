package rewrapped.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

  private final String CLIENT_ID = "0f36460fb586415ca4290ffdc712ea68";
  private final String CLIENT_SECRET = "8f7efe34265748668d254a3da349f30c";
  private final String REDIRECT_URI = "http://localhost:8080/api/spotify/callback";

  @GetMapping("/callback")
  public ResponseEntity<?> handleSpotifyCallback(@RequestParam("code") String code) {
    try {
      // URL encode the redirect URI
      String encodedRedirectUri = URLEncoder.encode(REDIRECT_URI, StandardCharsets.UTF_8);

      // Spotify token endpoint
      String tokenUrl = "https://accounts.spotify.com/api/token";

      // Headers for the request
      HttpHeaders headers = new HttpHeaders();
      headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET); // Use your client ID and secret
      headers.add("Content-Type", "application/x-www-form-urlencoded");

      // Request body
      String body = "grant_type=authorization_code&code=" + code + "&redirect_uri=" + encodedRedirectUri;

      HttpEntity<String> request = new HttpEntity<>(body, headers);

      // Make the POST request
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, String.class);

      // Return the access token response
      return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
      // Handle errors (e.g., invalid code or network issues)
      return ResponseEntity.status(500).body("Error exchanging code for access token: " + e.getMessage());
    }
  }
}
