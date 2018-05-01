package com.kenny.hodlinvest.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenny.hodlinvest.util.Secure;

import java.util.*;

@JsonIgnoreProperties(value = {"passwordHash", "email"}, allowSetters = true)
@DynamoDBTable(tableName="usersTable")
public class User {
    private String username;
    private String passwordHash;
    private String name;
    private String email;
    private double playMoney;

    private List<Transaction> transactions;
    private Map<String, Double> portfolio;

    public User(){}

    public User(
            @JsonProperty("username") String username,
            @JsonProperty("password") String password,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("playMoney") double playMoney,
            @JsonProperty("transactions") List<Transaction> transactions,
            @JsonProperty("portfolio") Map<String, Double> portfolio) {

        this.username = username;

        if(password == null)
            this.passwordHash = "";
        else
            this.passwordHash = Secure.generateHash(password);

        if(name == null)
            this.name = "";
        else
            this.name = name;
        if(email == null)
            this.email = "";
        else
            this.email = email;

        this.transactions = new ArrayList<>();
        this.portfolio = new HashMap<>();
        this.playMoney = 100000;
    }

    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBAttribute(attributeName = "passwordHash")
    public String getPasswordHash() {return passwordHash; }

    @DynamoDBAttribute(attributeName = "name")
    public String getName() {
        return name;
    }

    @DynamoDBAttribute(attributeName = "email")
    public String getEmail() {
        return email;
    }

    @DynamoDBAttribute(attributeName = "playMoney")
    public double getPlayMoney() {
        return playMoney;
    }

    @DynamoDBAttribute(attributeName = "transactions")
    public List<Transaction> getTransactions(){
        return this.transactions;
    }

    @DynamoDBAttribute(attributeName = "portfolio")
    public Map<String, Double> getPortfolio() {
        return portfolio;
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

    public void setPortfolio(Map<String, Double> portfolio) {
        this.portfolio = portfolio;
    }

    public void addToPortfolio(String ticker, double amout){getPortfolio().put(ticker, amout);}

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
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

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", playMoney=" + playMoney +
                ", transactions=" + transactions +
                ", portfolio=" + portfolio +
                '}';
    }
}
