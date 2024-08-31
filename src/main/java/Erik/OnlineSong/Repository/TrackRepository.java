package Erik.OnlineSong.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Erik.OnlineSong.Model.Track;

public interface TrackRepository extends JpaRepository<Track, Integer> {

    List<Track> findByPlaylistId(Integer playlistId);
}
