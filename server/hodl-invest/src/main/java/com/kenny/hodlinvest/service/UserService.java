package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.TestUserDatabase;
import com.kenny.hodlinvest.exception.UserNotFoundException;
import com.kenny.hodlinvest.model.Transaction;
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
            throw new IllegalStateException("Username already exists");
        }
        else{
            return database.insertUser(username, user);
        }
    }

    public User getUserByName(String username){
        return database.selectUserByName(username);
    }

    public List<User> getAllUsers(){
        return database.selectAllUsers();
    }

    public int updateUserByName(String username, User user){
        return database.updateUserByName(username, user);
    }

    public int deleteUserByName(String username){
        return database.deleteUserByName(username);
    }

    public boolean userExists(String username){
        return (getUserByName(username) != null);
    }

    public int updateUserPlayMoney(String username, double amount){
        User user = getUserByName(username);
        user.setPlayMoney(amount);
        updateUserByName(username, user);
        return 1;
    }

    public int addTransaction(String username, String ticker, double price){
        return database.updateTransactions(username, ticker, price);
    }

    public List<Transaction> getUserTransactions(String username){
        return database.selectAllTransactions(username);
    }
}
