package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;

import java.util.List;
import java.util.Map;

public interface UserDatabase {
    int insertUser(String username, User user);
    User selectUserByName(String username);
    List<User> selectAllUsers();
    int updateUserByName(String username, User user);
    int deleteUserByName(String username);
    int updateTransactions(String username, String name, String ticker, double amount, double price, String transactionType);
    List<Transaction> selectAllTransactions(String username);
    Map<String, Double> selectPortfolio(String username);
}
