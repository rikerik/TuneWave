package Erik.OnlineSong.Controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Erik.OnlineSong.Model.Playlist;
import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.PlaylistRepository;
import Erik.OnlineSong.Repository.TrackRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController {

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;

    public MusicController(PlaylistRepository playlistRepository, TrackRepository trackRepository) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
    }

    @GetMapping("/playlists")
    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getAllTracks() {
        return ResponseEntity.ok(trackRepository.findAll());
    }

    @GetMapping("/playlists/{playlistId}/tracks")
    public List<Track> getTracksByPlaylistId(@PathVariable Integer playlistId) {
        return trackRepository.findByPlaylistId(playlistId);
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
