package Erik.OnlineSong.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Erik.OnlineSong.Model.Track;

public interface TrackRepository extends JpaRepository<Track, Integer> {

}
