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
