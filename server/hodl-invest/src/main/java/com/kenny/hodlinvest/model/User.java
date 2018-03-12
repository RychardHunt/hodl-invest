package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
public class User {
    @Id
    private final String username;
    private final String name;
    private final String email;
    @NotNull
    private double playMoney;

//  private List<Cryptocoin> coins;
//  private List<Transaction> history;

    public User(
            @JsonProperty("username") String username,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("playMoney") double playMoney) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.playMoney = playMoney;
    }

    public String getUsername() {
        return username;
    }

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
