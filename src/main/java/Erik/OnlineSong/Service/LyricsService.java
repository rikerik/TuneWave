package Erik.OnlineSong.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Properties;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import Erik.OnlineSong.Model.Transcript;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LyricsService {

    private static final String KEY;

    static {
        Properties p = new Properties();
        try (InputStream input = LyricsService.class.getClassLoader().getResourceAsStream("config.properties")) {
            p.load(input);
        } catch (FileNotFoundException e) {
            log.error("Config file not found: ", e.getMessage());
        } catch (IOException e) {
            log.error("Error while getting config file: ", e.getMessage());
        }
        KEY = p.getProperty("api.key");
        log.info(KEY);

    }

    public String getLyrics(String track) throws Exception {
        Transcript transcript = new Transcript();
        transcript.setAudio(track);
        Gson gson = new Gson();
        String jsonRequest = gson.toJson(transcript);

        log.info(jsonRequest);

        HttpRequest postRequest = HttpRequest.newBuilder()
                .uri(new URI("https://api.assemblyai.com/v2/transcript"))
                .header("Authorization", KEY)
                .POST(BodyPublishers.ofString(jsonRequest))
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();

        HttpResponse<String> postResponse = httpClient.send(postRequest,
                BodyHandlers.ofString());

        log.info(postResponse.body());

        transcript = gson.fromJson(postResponse.body(), Transcript.class);

        transcript.getId();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(new URI("https://api.assemblyai.com/v2/transcript/" +
                        transcript.getId()))
                .header("Authorization", KEY)
                .build();

        while (true) {
            HttpResponse<String> getResponse = httpClient.send(getRequest,
                    BodyHandlers.ofString());
            transcript = gson.fromJson(getResponse.body(), Transcript.class);
            log.info(transcript.getStatus());

            if ("completed".equals(transcript.getStatus()) ||
                    "error".equals(transcript.getStatus())) {
                break;
            }
            Thread.sleep(1000);
        }
        log.info("Transcripton completed");

        return transcript.getText();

    }

}
