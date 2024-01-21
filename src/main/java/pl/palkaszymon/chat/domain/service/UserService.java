package pl.palkaszymon.chat.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.palkaszymon.chat.domain.exception.UserNotFoundException;
import pl.palkaszymon.chat.domain.mapper.UserMapper;
import pl.palkaszymon.chat.domain.model.user.UserEntity;
import pl.palkaszymon.chat.domain.model.user.User;
import pl.palkaszymon.chat.persistence.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public User changeOnlineStatusToFalse(String username){
        UserEntity foundUser = repository.findById(username).orElseThrow(UserNotFoundException::new);
        if (foundUser != null) {
            foundUser.setOnline(false);
            return UserMapper.dbUserEntityToUser(repository.save(foundUser));
        }
        return null;
    }

    public List<User> getActiveUsers() {
        return repository.findAllByOnline(true)
                .stream()
                .map(UserMapper::dbUserEntityToUser)
                .collect(Collectors.toList());
    }
}
