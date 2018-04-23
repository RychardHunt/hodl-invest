package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.TestUserDatabase;
import com.kenny.hodlinvest.exception.TransactionException;
import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.exception.UserNotFoundException;
import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import com.kenny.hodlinvest.util.Secure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public int addTransaction(String username, String name, String ticker, double amount, double price, String transactionType){
        return database.updateTransactions(username, name, ticker, amount, price, transactionType);
    }

    public Map<String, Double> getPortfolio(String username) {
        return database.selectPortfolio(username);
    }

    public List<Transaction> getUserTransactions(String username){
        return database.selectAllTransactions(username);
    }

    public boolean authenticateUser(String username, String password){
        if(username == null || password == null || !userExists(username))
            return false;

        User user = getUserByName(username);

        if(user == null)
            throw new UserException("User does not exists.");

        return user.getPasswordHash().equals(Secure.generateHash(password));
    }

}
