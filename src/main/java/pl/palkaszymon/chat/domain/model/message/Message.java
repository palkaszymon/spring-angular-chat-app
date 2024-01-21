package pl.palkaszymon.chat.domain.model.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Message {
    @Id
    private String id;
    private UUID chatId;
    private String sender;
    private String receiver;
    private Date sentAt;
    private String content;
}
