package pl.palkaszymon.chat.domain.mapper;

import pl.palkaszymon.chat.domain.model.user.UserEntity;
import pl.palkaszymon.chat.domain.model.user.User;

public class UserMapper {
    public static User dbUserEntityToUser(UserEntity entity) {
        return new User(entity.getUsername(), entity.getFullName(), entity.getOnline());
    }
}
