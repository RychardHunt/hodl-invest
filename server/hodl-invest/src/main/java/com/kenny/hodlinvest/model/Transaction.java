package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class Transaction {
    private Cryptocoin cryptocoin;
    private double amount;
    private String transactionType;
    private LocalDateTime localDateTime;

    public Transaction(
            @JsonProperty("cryptocoin") Cryptocoin cryptocoin,
            @JsonProperty("amount") double amount,
            @JsonProperty("transactionType") String transactionType,
            @JsonProperty("timestamp") LocalDateTime localDateTime) {
        this.cryptocoin = cryptocoin;

        if(localDateTime == null)
            localDateTime = LocalDateTime.now();
        else
            this.localDateTime = localDateTime;

        this.amount = amount;
        this.transactionType = transactionType;
    }

    public Cryptocoin getCryptocoin() {
        return cryptocoin;
    }

    public void setCryptocoin(Cryptocoin cryptocoin) {
        this.cryptocoin = cryptocoin;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
}
