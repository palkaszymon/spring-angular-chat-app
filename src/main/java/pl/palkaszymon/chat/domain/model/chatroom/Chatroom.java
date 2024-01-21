package pl.palkaszymon.chat.domain.model.chatroom;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class Chatroom {
    @Id
    private UUID chatId;
    private List<String> participants;
}
