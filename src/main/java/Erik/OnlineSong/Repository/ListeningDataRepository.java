package Erik.OnlineSong.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import Erik.OnlineSong.Model.ListeningData;

@Repository
public interface ListeningDataRepository extends JpaRepository<ListeningData, Integer> {

    @Query("SELECT l FROM ListeningData l WHERE l.userId = :userId AND l.timestamp >= :startOfWeek")
    List<ListeningData> findListeningDataForLastWeek(Integer userId, LocalDateTime startOfWeek);

    @Query("SELECT ld.artist, SUM(ld.duration) as totalDuration " +
            "FROM ListeningData ld " +
            "WHERE ld.userId = :userId " +
            "GROUP BY ld.artist " +
            "ORDER BY totalDuration DESC")
    List<Object[]> findFavoriteArtistsByUserId(Integer userId);

}
