package Erik.OnlineSong.Model;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "track")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "artist")
    private String artist;

    @Column(name = "length")
    private Double length;

    @Column(name = "lyrics")
    private String lyrics;

    @Column(name = "location")
    private String location;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id", nullable = false)
    @JsonBackReference // Prevent infinite recursion
    private Playlist playlist;

    @Transient
    private String base64Image;

    public void encodeImageToBase64() {
        if (image != null && !image.isEmpty()) {
            try {
                File imageFile = new File(image);
                FileInputStream fileInputStream = new FileInputStream(imageFile);
                byte[] imageBytes = fileInputStream.readAllBytes();
                base64Image = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(imageBytes);
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
