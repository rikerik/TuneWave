package Erik.OnlineSong;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.TrackRepository;

@SpringBootApplication
public class OnlineSongApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineSongApplication.class, args);
	}

	// Testing music player
	@Bean
	public CommandLineRunner demo(TrackRepository repository) {
		return (args) -> {

			Track track = Track.builder()
					.artist("Nimda")
					.title("Eternal")
					.length(302.4)
					.location("Path\\To\\Track.mp3")
					.build();
			repository.save(track);
		};
	}
}
