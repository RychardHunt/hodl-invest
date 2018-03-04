package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.TestUserDatabase;
import com.kenny.hodlinvest.model.User;

import java.util.List;

public class UserService {
    private final TestUserDatabase database;

    public UserService(TestUserDatabase database) {
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

    public List<User> getAlllUsers(){
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
}
