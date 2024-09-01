package Erik.OnlineSong.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.audio.mp3.MP3File;
import org.jaudiotagger.tag.TagException;
import org.springframework.stereotype.Service;

import Erik.OnlineSong.Model.Playlist;
import Erik.OnlineSong.Model.Track;
import Erik.OnlineSong.Repository.PlaylistRepository;
import Erik.OnlineSong.Repository.TrackRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PlaylistLoaderService {

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;

    public PlaylistLoaderService(PlaylistRepository playlistRepository, TrackRepository trackRepository) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
    }

    public void loadPlaylists(String musicFolderPath)
            throws IOException, TagException, ReadOnlyFileException, InvalidAudioFrameException {

        String currentPath = System.getProperty("user.dir");
        log.info("Working directory: " + currentPath);

        File musicFolder = new File(currentPath, musicFolderPath);
        log.info("Loading playlists from directory: " + musicFolder.getAbsolutePath());

        File[] playlistFolders = musicFolder.listFiles(File::isDirectory);

        if (playlistFolders == null || playlistFolders.length == 0) {
            log.warn("No playlist directories found in: " + musicFolder.getAbsolutePath());
            return;
        }

        for (File playlistFolder : playlistFolders) {
            log.info("Processing playlist folder: {}", playlistFolder.getName());

            // Load playlist details from the corresponding txt file
            File playlistInfoFile = new File(playlistFolder, playlistFolder.getName() + ".txt");

            if (!playlistInfoFile.exists()) {
                log.warn("Playlist info file not found: " + playlistInfoFile.getAbsolutePath());
                continue;
            }

            // There are 2 lines in the txt
            // First is the description for the playlist
            // Second is the image link for the playlist
            List<String> lines = Files.readAllLines(playlistInfoFile.toPath());
            if (lines.size() < 2) {
                log.warn("Playlist info file is incomplete: {}", playlistInfoFile.getAbsolutePath());
                continue;
            }

            String description = lines.get(0);
            String imageUrl = lines.get(1);

            Playlist playlist = Playlist.builder()
                    .title(playlistFolder.getName())
                    .description(description)
                    .image(imageUrl)
                    .build();

            playlist = playlistRepository.save(playlist);
            log.info("Saved playlist: {} with ID: {}", playlist.getTitle(), playlist.getId());

            // Load tracks in this playlist folder
            File[] trackFiles = playlistFolder.listFiles((dir, name) -> name.endsWith(".mp3"));

            if (trackFiles == null || trackFiles.length == 0) {
                log.warn("No tracks found in playlist folder: " + playlistFolder.getName());
                continue;
            }

            for (File trackFile : trackFiles) {
                // Extract artist and title from the file name
                String fileNameWithoutExtension = trackFile.getName().replace(".mp3", "");
                String[] parts = fileNameWithoutExtension.split(" - ", 2);

                if (parts.length < 2) {
                    log.warn("File name format is incorrect: " + trackFile.getName());
                    continue;
                }

                String artist = parts[0];
                String title = parts[1];

                // Search for an image file with the same name
                File[] imageFiles = playlistFolder.listFiles((dir, name) -> name.startsWith(fileNameWithoutExtension)
                        && (name.endsWith(".jpg") || name.endsWith(".png")));

                String imageLocation = null;
                if (imageFiles != null && imageFiles.length > 0) {
                    imageLocation = imageFiles[0].getAbsolutePath();
                    log.info("Found image for track: {} at {}", trackFile.getName(), imageLocation);
                } else {
                    log.info("No image found for track: " + trackFile.getName());
                }

                log.info("Processing track file: " + trackFile.getName());

                Track track = Track.builder()
                        .title(title)
                        .artist(artist)
                        .location(trackFile.getAbsolutePath())
                        .playlist(playlist)
                        .image(imageLocation)
                        // Using jauditotagger to get length
                        .length((double) new MP3File(trackFile.getAbsolutePath()).getAudioHeader().getTrackLength())
                        .build();

                trackRepository.save(track);
                log.info("Saved track: {} by artist: {} for playlist: {}", track.getTitle(), track.getArtist(),
                        playlist.getTitle());
            }
        }

        log.info("Completed loading playlists from directory: " + musicFolder.getAbsolutePath());
    }

}
