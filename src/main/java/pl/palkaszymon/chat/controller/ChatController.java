package pl.palkaszymon.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.palkaszymon.chat.domain.model.message.Message;
import pl.palkaszymon.chat.domain.service.MessageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final SimpMessagingTemplate template;
    private final MessageService messageService;

    @GetMapping("api/messages/{sender}/{receiver}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String sender, @PathVariable String receiver) {
        log.info("Received get messages between: {} and {} request", sender, receiver);
        return ResponseEntity.ok(messageService.getMessages(sender, receiver));
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        Message processedMessage = messageService.save(message);

        template.convertAndSendToUser(processedMessage.getReceiver(), "/queue/messages", Message.builder()
                .chatId(processedMessage.getChatId())
                .sender(processedMessage.getSender())
                .receiver(processedMessage.getReceiver())
                .sentAt(processedMessage.getSentAt())
                .content(processedMessage.getContent()).build());
        log.info("Processed message id: {}", processedMessage.getId());
    }
}
