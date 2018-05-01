package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.TestUserDatabase;
import com.kenny.hodlinvest.database.UserDynamoDatabase;
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

    @Autowired
    private UserDynamoDatabase userDynamoDatabase;

    public void addUser(String username, User user){
        if(userExists(username)){
            throw new IllegalStateException("Username already exists");
        }
        else{
            userDynamoDatabase.insertUser(user);
        }
    }

    public User getUserByName(String username){
        return userDynamoDatabase.selectUser(username);
    }

    public List<User> getAllUsers(){
        return userDynamoDatabase.selectAllUsers();
    }

    public void updateUserByName(String username, User user){
        userDynamoDatabase.insertUser(user);
    }

    public void deleteUserByName(String username){
         userDynamoDatabase.deleteUser(username);
    }

    public boolean userExists(String username){
        return (getUserByName(username) != null);
    }

    public void updateUserPlayMoney(String username, double amount) {
        User user = getUserByName(username);
        userDynamoDatabase.updateUserMoney(username, amount);
    }

    public void addTransaction(String username, String name, String ticker, double amount, double price, String transactionType){
        userDynamoDatabase.updateUserTransactions(username, new Transaction(new Cryptocoin(name, ticker, price), amount, transactionType, null));
    }

    public Map<String, Double> getPortfolio(String username){
        User user = userDynamoDatabase.selectUser(username);

        return user.getPortfolio();
    }

    public List<Transaction> getUserTransactions(String username){
        User user = userDynamoDatabase.selectUser(username);
        return user.getTransactions();
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
