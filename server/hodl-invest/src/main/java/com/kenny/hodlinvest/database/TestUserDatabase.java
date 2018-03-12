package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("testDatabase")
public class TestUserDatabase implements UserDatabase {

    private final Map<String, User> database;

    public TestUserDatabase() {
        this.database = new HashMap<>();
        insertUser("zoro", new User("zoro", "kenny", "email@email.com", 1000));
        insertUser("ninja", new User("ninja", "tyler", "lol@email.com", 2000));
        insertUser("summit1g", new User("summit11g", "josh", "summit@email.com", 1000));
    }

    @Override
    public int insertUser(String username, User user) {
        database.put(username, user);
        return 1;
    }

    @Override
    public User selectUserByName(String username) {
        return database.get(username);
    }

    @Override
    public List<User> selectAllUsers() {
        return new ArrayList<>(database.values());
    }

    @Override
    public int updateUserByName(String username, User user) {
        database.put(username, user);

        return 1;
    }

    @Override
    public int deleteUserByName(String username) {
        database.remove(username);
        return 1;
    }
}
