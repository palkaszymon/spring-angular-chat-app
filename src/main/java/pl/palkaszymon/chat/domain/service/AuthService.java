package pl.palkaszymon.chat.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.palkaszymon.chat.domain.exception.IncorrectPasswordException;
import pl.palkaszymon.chat.domain.exception.UserAlreadyExistsException;
import pl.palkaszymon.chat.domain.exception.UserNotFoundException;
import pl.palkaszymon.chat.domain.mapper.UserMapper;
import pl.palkaszymon.chat.domain.model.user.User;
import pl.palkaszymon.chat.domain.model.user.LoggingInUser;
import pl.palkaszymon.chat.domain.model.user.UserEntity;
import pl.palkaszymon.chat.persistence.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public void registerUser(UserEntity user) {
        UserEntity foundUser = repository.findUserByUsername(user.getUsername()).orElse(null);

        if (foundUser != null) {
            throw new UserAlreadyExistsException();
        }
        else {
            user.setPassword(encoder.encode(user.getPassword()));
            repository.save(user);
        }
    }

    public User loginUser(LoggingInUser user) {
        UserEntity foundUser = repository.findUserByUsername(user.username()).orElse(null);

        if (foundUser == null) {
            throw new UserNotFoundException();
        }

        if (!encoder.matches(user.password(), foundUser.getPassword())) {
            throw new IncorrectPasswordException();
        }

        foundUser.setOnline(true);
        return UserMapper.dbUserEntityToUser(repository.save(foundUser));
    }
}
