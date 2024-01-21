package pl.palkaszymon.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.palkaszymon.chat.domain.model.request.LoginRequest;
import pl.palkaszymon.chat.domain.model.request.RegistrationRequest;
import pl.palkaszymon.chat.domain.model.user.User;
import pl.palkaszymon.chat.domain.model.user.LoggingInUser;
import pl.palkaszymon.chat.domain.model.user.UserEntity;
import pl.palkaszymon.chat.domain.service.AuthService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    private final SimpMessagingTemplate template;
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegistrationRequest request) {
        UserEntity user = new UserEntity(request.username(), request.fullName(), request.password(), false);
        authService.registerUser(user);
        log.info("Registered user: {}", request.username());
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        LoggingInUser user = new LoggingInUser(request.username(), request.password());
        User loggedInUser = authService.loginUser(user);
        // this is related to weird spring exception, even though the message is sent correctly, it throws exception that the path is wrong
        try {
            template.convertAndSend("/user/public", loggedInUser);
        } catch (Exception ex) {
            if (ex.getCause().getClass() != IllegalArgumentException.class) {
                return ResponseEntity.internalServerError().build();
            }
        }
        log.info("Logged in user: {}", request.username());
        return ResponseEntity.ok(loggedInUser);
    }
}
