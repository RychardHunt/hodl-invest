package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenny.hodlinvest.util.Secure;

import java.util.*;

@JsonIgnoreProperties(value = {"passwordHash", "email"}, allowSetters = true)
public class User {
    private final String username;
    private String passwordHash;
    private String name;
    private String email;
    private double playMoney;

    private List<Transaction> transactions;
    private Map<Cryptocoin, Double> portfolio;

    public User(
            @JsonProperty("username") String username,
            @JsonProperty("password") String password,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("playMoney") double playMoney,
            @JsonProperty("transactions") List<Transaction> transactions,
            @JsonProperty("portfolio") Map<Cryptocoin, Double> portfolio) {
        this.username = username;
        this.passwordHash = Secure.generateHash(password);

        if(name == null)
            this.name = "";
        else
            this.name = name;
        if(email == null)
            this.email = "";
        else
            this.email = email;
        if(playMoney == 0)
            playMoney = 10000;
        else
            this.playMoney = playMoney;

        if(transactions == null)
            this.transactions = new ArrayList<>();
        else
            this.transactions = transactions;

        if(portfolio == null)
            this.portfolio = new HashMap<>();
        else
            this.portfolio = portfolio;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {return passwordHash; }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public double getPlayMoney() {
        return playMoney;
    }

    public void setPlayMoney(double playMoney) {
        this.playMoney = playMoney;
    }

    public void addTransaction(Transaction transaction){
        transactions.add(transaction);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Transaction> getTransactions(){
        return this.transactions;
    }

    public Map<Cryptocoin, Double> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Map<Cryptocoin, Double> portfolio) {
        this.portfolio = portfolio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Double.compare(user.playMoney, playMoney) == 0 &&
                Objects.equals(username, user.username) &&
                Objects.equals(name, user.name) &&
                Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {

        return Objects.hash(username, name, email, playMoney);
    }
}
