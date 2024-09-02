package Erik.OnlineSong.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Properties;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import Erik.OnlineSong.Model.Transcript;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LyricsService {

    private static final String KEY; // API key for AssembylAI
    private static final String TRANSCRIPT_API_URL = "https://api.assemblyai.com/v2/transcript";

    // Retrieve api key from config.properties
    static {
        Properties p = new Properties();
        try (InputStream input = LyricsService.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new FileNotFoundException("Config file not found");
            }
            p.load(input);
            KEY = p.getProperty("api.key");
            if (KEY == null || KEY.isEmpty()) {
                throw new IllegalStateException("API key not found in config file");
            }
        } catch (IOException e) {
            log.error("Error while loading config file: ", e);
            throw new RuntimeException(e);
        }
    }

    public String getLyrics(String trackUrl) throws Exception {
        Transcript transcript = new Transcript();
        transcript.setAudio_url(trackUrl);
        Gson gson = new Gson();
        String jsonRequest = gson.toJson(transcript);

        log.info("Request payload: {}", jsonRequest);

        HttpRequest postRequest = HttpRequest.newBuilder()
                .uri(new URI(TRANSCRIPT_API_URL))
                .header("Authorization", KEY)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonRequest))
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> postResponse = httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());

        log.info("Post request status code: {}", postResponse.statusCode());
        log.info("Post response body: {}", postResponse.body());

        if (postResponse.statusCode() != 200) {
            log.error("Failed to post request: Status code {} - Response body: {}", postResponse.statusCode(),
                    postResponse.body());
            throw new IOException("Failed to get transcript ID");
        }

        try {
            transcript = gson.fromJson(postResponse.body(), Transcript.class);
        } catch (JsonSyntaxException e) {
            log.error("Failed to parse JSON response: ", e);
            throw new IOException("Failed to parse response from AssemblyAI");
        }
        log.info(postResponse.body());

        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(new URI(TRANSCRIPT_API_URL + "/" + transcript.getId()))
                .header("Authorization", KEY)
                .build();

        while (true) {
            HttpResponse<String> getResponse = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());
            log.info(transcript.getStatus());

            if (getResponse.statusCode() != 200) {
                log.error("Failed to get transcript status: Status code {} - Response body: {}",
                        getResponse.statusCode(), getResponse.body());
                throw new IOException("Failed to get transcript status");
            }

            try {
                transcript = gson.fromJson(getResponse.body(), Transcript.class);
            } catch (JsonSyntaxException e) {
                log.error("Failed to parse JSON response: ", e);
                throw new IOException("Failed to parse response from AssemblyAI");
            }

            if ("completed".equals(transcript.getStatus()) || "error".equals(transcript.getStatus())) {
                break;
            }
            Thread.sleep(1000);
        }

        log.info("Transcription completed");

        return transcript.getText();
    }

}
