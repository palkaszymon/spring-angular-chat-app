package pl.palkaszymon.chat.persistence.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pl.palkaszymon.chat.domain.model.chatroom.Chatroom;

import java.util.List;
import java.util.Optional;

public interface ChatroomRepository extends MongoRepository<Chatroom, String> {
    @Query("{ 'participants': { $all: ?0 } }")
    Optional<Chatroom> findByParticipants(List<String> participants);
}
