package Erik.OnlineSong.Controller;

import org.springframework.web.bind.annotation.RestController;

import Erik.OnlineSong.Service.LyricsService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@RequestMapping("/lyrics")
public class LyricsController {

    private final LyricsService lService;

    public LyricsController(LyricsService lService) {
        this.lService = lService;
    }

    @GetMapping("/get")
    public ResponseEntity<String> getLyrics(@RequestParam String trackLocation) {
        try {
            return ResponseEntity.ok().body(lService.getLyrics(trackLocation));
        } catch (Exception e) {
            log.error("Error while fetching lyrics: ", e);
            return ResponseEntity.internalServerError().body("Error while fetching lyrics");

        }

    }

}
