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

    public void processBuyRequest(User user, String ticker, double amount, double price){
        double totalPrice = amount * price;
        System.out.println("Total price is " + totalPrice);
        if(user.getPlayMoney() < totalPrice){
            throw new TransactionException("User " + user.getName() + " does not have enough money to process this transaction. Needs " + totalPrice + "but only has " + user.getPlayMoney());
        }

        user.setPlayMoney(user.getPlayMoney() - totalPrice);
        System.out.println("User now has " + user.getPlayMoney());

        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "BUY");
        addToTransaction(user, capsTicker, amount, price, "BUY");

    }

    public void processSellRequest(User user, String ticker, double amount, double price){
        Map<String, Double> portfolio = user.getPortfolio();
        String capsTicker = ticker.toUpperCase();

        updatePortfolio(user, capsTicker, amount, "SELL");
        addToTransaction(user, capsTicker, amount, price, "SELL");
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

    private void addToTransaction(User user, String ticker, double amount, double price, String transactionType){
        user.addTransaction(new Transaction(new Cryptocoin(ticker, price), amount, transactionType, LocalDateTime.now()));

    }
}
