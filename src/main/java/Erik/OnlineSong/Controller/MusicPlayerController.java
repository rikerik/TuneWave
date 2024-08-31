package Erik.OnlineSong.Controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.PlaylistRepository;
import Erik.OnlineSong.Repository.TrackRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicPlayerController {

    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;

    public MusicPlayerController(TrackRepository trackRepository, PlaylistRepository playlistRepository) {
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
    }

    // Fetch all tracks
    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getAllTracks() {
        return ResponseEntity.ok(trackRepository.findAll());
    }

    // Fetch tracks by playlist ID
    @GetMapping("/playlists/{playlistId}/tracks")
    public ResponseEntity<List<Track>> getTracksByPlaylistId(@PathVariable Integer playlistId) {
        List<Track> tracks = trackRepository.findByPlaylistId(playlistId);
        return ResponseEntity.ok(tracks);
    }

    // Fetch track by ID and provide audio stream
    @GetMapping("/tracks/{id}")
    public ResponseEntity<Resource> getTrack(@PathVariable Integer id) {
        return trackRepository.findById(id)
                .map(track -> {
                    Path path = Paths.get(track.getLocation());
                    Resource resource = new FileSystemResource(path);
                    HttpHeaders headers = new HttpHeaders();
                    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + track.getTitle() + ".mp3");
                    return ResponseEntity.ok()
                            .headers(headers)
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .body(resource);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
