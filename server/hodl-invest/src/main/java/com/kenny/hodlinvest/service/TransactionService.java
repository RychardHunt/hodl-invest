package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.UserDynamoDatabase;
import com.kenny.hodlinvest.exception.TransactionException;
import com.kenny.hodlinvest.exception.UnknownServerException;
import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private UserDynamoDatabase userDynamoDatabase;

    @Autowired
    public TransactionService() {}

    public void processBuyRequest(String username, String name, String ticker, double amount, double price){
        if(name == null)
            throw new TransactionException("Invalid cryptocoin name: " + name);
        if(ticker == null)
            throw new TransactionException("Invalid ticker name: " + ticker);
        if(amount <= 0)
            throw new TransactionException("Invalid amount: " + amount);
        if(price <= 0)
            throw new TransactionException("Invalid price: " + price);

        double totalPrice = amount * price;

        User user = userDynamoDatabase.selectUser(username);

        if(user == null)
            throw new TransactionException("Can not process buy request on a null user");

        if(user.getPlayMoney() < totalPrice){
            throw new TransactionException("User " + user.getName() + " does not have enough money to process this transaction. Needs " + totalPrice + "but only has " + user.getPlayMoney());
        }

        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "BUY");
        addToTransaction(user, name, capsTicker, amount, price, "BUY");
        userDynamoDatabase.updateUserMoney(username, user.getPlayMoney() - totalPrice);
    }

    public void processSellRequest(String username, String name, String ticker, double amount, double price){
        if(name == null)
            throw new TransactionException("Invalid cryptocoin name: " + name);
        if(ticker == null)
            throw new TransactionException("Invalid ticker name: " + ticker);
        if(amount <= 0)
            throw new TransactionException("Invalid amount: " + amount);
        if(price <= 0)
            throw new TransactionException("Invalid price: " + price);

        User user = userDynamoDatabase.selectUser(username);

        if(user == null)
            throw new TransactionException("Can not process buy request on a null user");

        Map<String, Double> portfolio = user.getPortfolio();
        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "SELL");
        addToTransaction(user, name, capsTicker, amount, price, "SELL");
        userDynamoDatabase.updateUserMoney(username, user.getPlayMoney() + (amount * price));
    }

    private void updatePortfolio(User user, String ticker, double amount, String transactionType){
        Map<String, Double> portfolio = user.getPortfolio();

        if(transactionType.equals("BUY")){
            if(portfolio.containsKey(ticker)){
                userDynamoDatabase.updateUserPortfolio(user.getUsername(), ticker, portfolio.get(ticker) + amount);
            }
            else{
                userDynamoDatabase.updateUserPortfolio(user.getUsername(), ticker, amount);

            }

        } else if(transactionType.equals("SELL")){
            if(!portfolio.containsKey(ticker)){
                throw new TransactionException("User does not own any cryptocoin: " + ticker);
            } else if(portfolio.get(ticker) < amount){
                throw new TransactionException("Error. Attempting to sell more than what the user has. User only has " + portfolio.get(ticker) + " " + ticker);
            } else{
                System.out.println("updating portfolio due to selling");
                userDynamoDatabase.updateUserPortfolio(user.getUsername(), ticker, portfolio.get(ticker) - amount);
            }
        } else{
            throw new UnknownServerException("Invalid transactionType " + transactionType);
        }

    }

    private void addToTransaction(User user, String name, String ticker, double amount, double price, String transactionType){
        user.addTransaction(new Transaction(new Cryptocoin(name, ticker, price), amount, transactionType, LocalDateTime.now()));
    }
}
