package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;

import java.util.List;

public interface UserDatabase {
    int insertUser(String username, User user);
    User selectUserByName(String username);
    List<User> selectAllUsers();
    int updateUserByName(String username, User user);
    int deleteUserByName(String username);
    int updateTransactions(String username, String ticker, double price);
    List<Transaction> selectAllTransactions(String username);
}
