package pl.palkaszymon.chat.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.palkaszymon.chat.domain.model.chatroom.Chatroom;
import pl.palkaszymon.chat.persistence.repository.ChatroomRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatroomRepository repository;

    public Optional<UUID> getChatroomId(String senderId, String receiverId, boolean createRoomIfNotExists) {
        List<String> participants = List.of(senderId, receiverId);
        return repository.findByParticipants(participants)
                .map(Chatroom::getChatId)
                .or(() ->{
                    if (createRoomIfNotExists) {
                        var chatId = createChatroom(participants);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private UUID createChatroom(List<String> participants) {
        return repository.save(Chatroom.builder()
                .chatId(UUID.randomUUID())
                .participants(participants)
                .build()).getChatId();
    }
}
