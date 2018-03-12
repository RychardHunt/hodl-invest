package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.TestUserDatabase;
import com.kenny.hodlinvest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final TestUserDatabase database;

    @Autowired
    public UserService(@Qualifier("testDatabase") TestUserDatabase database) {
        this.database = database;
    }

    public int addUser(String username, User user){
        if(userExists(username)){
            return -1;
        }
        else{
            database.insertUser(username, user);
            return 1;
        }
    }

    public User getUserByName(String username){
        return database.selectUserByName(username);
    }

    public List<User> getAllUsers(){
        return database.selectAllUsers();
    }

    public int updateUserByName(String username, User user){
        if(!userExists(username)){
            return -1;
        }
        database.updateUserByName(username, user);
        return 1;
    }

    public int deleteUserByName(String username){
        if(!userExists(username)){
            return -1;
        }
        database.deleteUserByName(username);
        return 1;
    }

    public boolean userExists(String username){
        return (getUserByName(username) != null);
    }

    public int updateUserPlayMoney(String username, double amount){
        if(!userExists(username)) {
            return 0;
        }

        User user = getUserByName(username);
        user.setPlayMoney(amount);
        updateUserByName(username, user);
        return 1;
    }
}
