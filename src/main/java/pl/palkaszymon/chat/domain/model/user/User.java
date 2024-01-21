package pl.palkaszymon.chat.domain.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class User {
    private String username;
    private String fullName;
    private Boolean online;
}
