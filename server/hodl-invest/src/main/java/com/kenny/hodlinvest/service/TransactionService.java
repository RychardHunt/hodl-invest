package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.exception.TransactionException;
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
    public TransactionService() {
    }

    public void processBuyRequest(User user, String name, String ticker, double amount, double price){
        if(name == null)
            throw new TransactionException("Invalid cryptocoin name: " + name);
        if(ticker == null)
            throw new TransactionException("Invalid ticker name: " + ticker);
        if(amount <= 0)
            throw new TransactionException("Invalid amount: " + amount);
        if(price <= 0)
            throw new TransactionException("Invalid price: " + price);

        double totalPrice = amount * price;
        if(user.getPlayMoney() < totalPrice){
            throw new TransactionException("User " + user.getName() + " does not have enough money to process this transaction. Needs " + totalPrice + "but only has " + user.getPlayMoney());
        }

        user.setPlayMoney(user.getPlayMoney() - totalPrice);
        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "BUY");
        addToTransaction(user, name, capsTicker, amount, price, "BUY");
    }

    public void processSellRequest(User user, String name, String ticker, double amount, double price){
        if(name == null)
            throw new TransactionException("Invalid cryptocoin name: " + name);
        if(ticker == null)
            throw new TransactionException("Invalid ticker name: " + ticker);
        if(amount <= 0)
            throw new TransactionException("Invalid amount: " + amount);
        if(price <= 0)
            throw new TransactionException("Invalid price: " + price);

        Map<String, Double> portfolio = user.getPortfolio();
        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "SELL");
        addToTransaction(user, name, capsTicker, amount, price, "SELL");
        user.setPlayMoney(user.getPlayMoney() + (amount * price));

    }

    private void updatePortfolio(User user, String ticker, double amount, String transactionType){
        Map<String, Double> portfolio = user.getPortfolio();

        if(transactionType.equals("BUY")){
            if(portfolio.containsKey(ticker)){
                user.addToPortfolio(ticker, portfolio.get(ticker) + amount);
            }
            else{
                user.addToPortfolio(ticker, amount);
            }
        } else if(transactionType.equals("SELL")){
            if(!portfolio.containsKey(ticker)){
                throw new TransactionException("User does not own any cryptocoin: " + ticker);
            } else if(portfolio.get(ticker) < amount){
                throw new TransactionException("Error. Attempting to sell more than what the user has. User only has " + portfolio.get(ticker) + " " + ticker);
            } else{
                user.addToPortfolio(ticker, portfolio.get(ticker) - amount);
                if(portfolio.get(ticker) == 0){
                    portfolio.remove(ticker);
                }
            }
        }

    }

    private void addToTransaction(User user, String name, String ticker, double amount, double price, String transactionType){
        user.addTransaction(new Transaction(new Cryptocoin(name, ticker, price), amount, transactionType, LocalDateTime.now()));

    }
}
