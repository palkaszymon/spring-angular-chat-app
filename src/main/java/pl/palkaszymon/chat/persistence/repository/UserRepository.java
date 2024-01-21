package pl.palkaszymon.chat.persistence.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.palkaszymon.chat.domain.model.user.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    List<UserEntity> findAllByOnline(boolean online);
    Optional<UserEntity> findUserByUsername(String username);
}
