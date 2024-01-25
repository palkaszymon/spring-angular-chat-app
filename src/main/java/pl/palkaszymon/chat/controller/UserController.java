package pl.palkaszymon.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import pl.palkaszymon.chat.domain.model.user.User;
import pl.palkaszymon.chat.domain.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final SimpMessagingTemplate template;
    private final UserService service;

    @GetMapping()
    public ResponseEntity<List<User>> getActiveUsers() {
        log.info("Received get active users request.");
        return ResponseEntity.ok(service.getActiveUsers());
    }

    @PostMapping("disconnect/{username}")
    public ResponseEntity<Void> disconnectUser(@PathVariable String username) {
        User offlineUser = service.changeOnlineStatusToFalse(username);

        // this is related to weird spring exception, even though the message is sent correctly, it throws exception that the destination path is wrong
        try {
            template.convertAndSend("/user/public", offlineUser);
        } catch (Exception ex) {
            if (ex.getCause().getClass() != IllegalArgumentException.class) {
                return ResponseEntity.internalServerError().build();
            }
        }
        log.info("Disconnected user: {}", username);
        return ResponseEntity.ok().build();
    }
}
