package Erik.OnlineSong;

import Erik.OnlineSong.Service.LyricsService;
import Erik.OnlineSong.Service.PlaylistLoaderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineSongApplication implements CommandLineRunner {

	private PlaylistLoaderService playlistLoaderService;
	private LyricsService lyricsService;

	public OnlineSongApplication(PlaylistLoaderService playlistLoaderService, LyricsService lyricsService) {
		this.playlistLoaderService = playlistLoaderService;
		this.lyricsService = lyricsService;
	}

	public static void main(String[] args) {
		SpringApplication.run(OnlineSongApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Music folder
		String musicFolderPath = "\\src\\main\\resources\\Music";
		playlistLoaderService.loadPlaylists(musicFolderPath);
	}

}
