package Erik.OnlineSong.Controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Erik.OnlineSong.Model.Playlist;
import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.PlaylistRepository;
import Erik.OnlineSong.Repository.TrackRepository;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/music")
public class MusicController {

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;
    private final AmazonS3 s3Client;

    public MusicController(PlaylistRepository playlistRepository, TrackRepository trackRepository, AmazonS3 s3Client) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
        this.s3Client = s3Client;
    }

    @GetMapping("/playlists")
    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getAllTracks() {
        List<Track> tracks = trackRepository.findAll();
        for (Track track : tracks) {
            track.encodeImageToBase64(s3Client); // Convert image to Base64 for each track using S3
        }
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/tracks/playlist/{playlistId}")
    public ResponseEntity<List<Track>> getTracksByPlaylistId(@PathVariable Integer playlistId) {
        List<Track> tracks = trackRepository.findByPlaylistId(playlistId);
        for (Track track : tracks) {
            track.encodeImageToBase64(s3Client);
        }
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/tracks/{id}")
    public ResponseEntity<Resource> getTrack(@PathVariable Integer id) {
        // Fetch the track from the repository
        Optional<Track> optionalTrack = trackRepository.findById(id);

        if (optionalTrack.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Track track = optionalTrack.get();

        try {
            // Fetch the S3 object
            S3Object s3Object = s3Client.getObject(new GetObjectRequest("tunewave", track.getLocation()));
            InputStream inputStream = s3Object.getObjectContent();

            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (track.getLocation().endsWith(".mp3")) {
                mediaType = MediaType.valueOf("audio/mpeg");
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(new InputStreamResource(inputStream));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}