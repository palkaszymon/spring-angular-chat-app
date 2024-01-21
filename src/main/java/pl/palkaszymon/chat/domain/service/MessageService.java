package pl.palkaszymon.chat.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.palkaszymon.chat.domain.exception.ChatroomNotFoundException;
import pl.palkaszymon.chat.domain.model.message.Message;
import pl.palkaszymon.chat.persistence.repository.MessageRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final ChatroomService chatroomService;

    public Message save(Message message) {
        var chatId = chatroomService.getChatroomId(message.getSender(), message.getReceiver(), true).orElseThrow(ChatroomNotFoundException::new);
        message.setChatId(chatId);
        return repository.save(message);
    }

    public List<Message> getMessages(String senderId, String receiverId) {
        Optional<UUID> chatId = chatroomService.getChatroomId(senderId, receiverId, false);
        return chatId.map(repository::findByChatId).orElse(Collections.emptyList());
    }
}
