package com.kenny.hodlinvest.model;

import lombok.Data;

@Data
public class User {
    private final String username;
    private final String name;
    private final String email;


    private double playMoney;
//  private List<Cryptocurrency> coins;
//  private List<Transactions> history;

    public User(String username, String name, String email, double playMoney) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.playMoney = playMoney;
    }
}
