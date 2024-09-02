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
        List<Track> tracks = trackRepository.findAll();
        for (Track track : tracks) {
            track.encodeImageToBase64(); // Convert image to Base64 for each track
        }
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/tracks/playlist/{playlistId}")
    public ResponseEntity<List<Track>> getTracksByPlaylistId(@PathVariable Integer playlistId) {
        List<Track> tracks = trackRepository.findByPlaylistId(playlistId);
        for (Track track : tracks) {
            track.encodeImageToBase64(); // Convert image to Base64
        }
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/tracks/{id}")
    public ResponseEntity<Resource> getTrack(@PathVariable Integer id) {
        // Check if the track exists
        return trackRepository.findById(id)
                .map(track -> {
                    Path path = Paths.get(track.getLocation());
                    Resource resource = new FileSystemResource(path);

                    MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
                    if (path.toString().endsWith(".mp3")) {
                        mediaType = MediaType.valueOf("audio/mpeg");
                    }

                    return ResponseEntity.ok()
                            .contentType(mediaType)
                            .body(resource);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
