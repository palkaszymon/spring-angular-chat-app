package pl.palkaszymon.chat.persistence.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.palkaszymon.chat.domain.model.message.Message;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatId(UUID chatId);
}
