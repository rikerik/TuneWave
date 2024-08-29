package Erik.OnlineSong.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.TrackRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/music")
public class MusicPlayerController {

    private final TrackRepository trackRepository;

    public MusicPlayerController(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getAllTracks() {
        return ResponseEntity.ok(trackRepository.findAll());
    }

    @GetMapping("/tracks/{id}")
    public ResponseEntity<Resource> getTrack(@PathVariable Integer id) {
        // Check if the track exists
        return trackRepository.findById(id)
                .map(track -> {
                    Path path = Paths.get(track.getLocation());
                    Resource resource = new FileSystemResource(path);
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .body(resource);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
