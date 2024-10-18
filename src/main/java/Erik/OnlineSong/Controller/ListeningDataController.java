package Erik.OnlineSong.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Erik.OnlineSong.DTO.ListeningDataDTO;
import Erik.OnlineSong.Service.ListeningDataService;

@RestController
@RequestMapping("/listening")
public class ListeningDataController {

    private ListeningDataService listeningDataService;

    public ListeningDataController(ListeningDataService listeningDataService) {
        this.listeningDataService = listeningDataService;
    }

    @PostMapping("/statistics")
    public ResponseEntity<Void> sendListeningData(@RequestBody ListeningDataDTO listeningDataDTO) {
        // Call the service to handle the listening data
        listeningDataService.processListeningData(listeningDataDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/listening-time/week")
    public int getTotalListeningTimeForWeek(@PathVariable Integer userId) {
        System.out.println("USERID IN CONTROLLER: " + userId);
        // Call the service to get the total listening minutes for the week
        return listeningDataService.getTotalListeningMinutesForWeek(userId);
    }

    @GetMapping("/users/{userId}/favorite-artists")
    public List<Object[]> getFavoriteArtists(@PathVariable Integer userId) {
        return listeningDataService.getFavoriteArtistsByUserId(userId);
    }

}
