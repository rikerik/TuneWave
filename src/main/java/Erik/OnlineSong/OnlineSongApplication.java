package Erik.OnlineSong;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
					.location("C:\\Users\\Erik\\Asztal\\programing\\OnlineSong\\NIMDA - ETERNAL.mp3")
					.image("https://i1.sndcdn.com/artworks-QNqbdAmBZLbpoH00-G8C0kQ-t500x500.jpg")
					.build();
			repository.save(track);

			Track track2 = Track.builder()
					.artist("Slipknot")
					.title("Psychosocial")
					.length(300.2)
					.location("C:\\Users\\Erik\\Asztal\\programing\\OnlineSong\\Slipknot.mp3")
					.image("https://i.scdn.co/image/ab6761610000e5ebd0cdb283a7384a0edb665182")
					.build();
			repository.save(track2);
		};

	}

}
