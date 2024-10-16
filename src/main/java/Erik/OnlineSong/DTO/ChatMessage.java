package Erik.OnlineSong.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    // Strucutre of message
    private String group;
    private String sender;
    private String content;

}
