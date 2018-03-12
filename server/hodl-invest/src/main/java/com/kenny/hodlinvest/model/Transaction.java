package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class Transaction {
    private Cryptocoin cryptocoin;
    private double price;
    private LocalDateTime localDateTime;

    public Transaction(
            @JsonProperty Cryptocoin cryptocoin,
            @JsonProperty double price,
            LocalDateTime localDateTime) {
        this.cryptocoin = cryptocoin;
        this.price = price;
        this.localDateTime = localDateTime;
    }

    public Cryptocoin getCryptocoin() {
        return cryptocoin;
    }

    public void setCryptocoin(Cryptocoin cryptocoin) {
        this.cryptocoin = cryptocoin;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }
}
