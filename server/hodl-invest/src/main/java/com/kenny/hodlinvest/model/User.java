package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenny.hodlinvest.util.Secure;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class User {
    private final String username;
    private String passwordHash;
    private String name;
    private String email;
    private double playMoney;

    private List<Transaction> transactions;

    public User(
            @JsonProperty("username") String username,
            @JsonProperty("passwordHash") String password,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("playMoney") double playMoney,
            @JsonProperty("transactions") List<Transaction> transactions) {
        this.username = username;
        this.passwordHash = Secure.generateHash(password);
        this.name = name;
        this.email = email;
        this.playMoney = playMoney;
        this.transactions = transactions;
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

    public List<Transaction> getTransactions(){
        return this.transactions;
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
