package Erik.OnlineSong.Controller;

import Erik.OnlineSong.Model.Playlist;
import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.PlaylistRepository;
import Erik.OnlineSong.Repository.TrackRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    @GetMapping("/playlists/{playlistId}/tracks")
    public List<Track> getTracksByPlaylistId(@PathVariable Integer playlistId) {
        return trackRepository.findByPlaylistId(playlistId);
    }

    @GetMapping("/tracks/{id}")
    public Optional<Track> getTrackById(@PathVariable Integer id) {
        return trackRepository.findById(id);
    }
}
