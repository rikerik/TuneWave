package Erik.OnlineSong.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Erik.OnlineSong.Model.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

}
