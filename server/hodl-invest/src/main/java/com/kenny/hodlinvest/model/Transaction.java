package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class Transaction {
    private Cryptocoin cryptocoin;
    private LocalDateTime localDateTime;

    public Transaction(
            @JsonProperty("cryptocoin") Cryptocoin cryptocoin,
            @JsonProperty("timestamp") LocalDateTime localDateTime) {
        this.cryptocoin = cryptocoin;

        if(localDateTime == null)
            localDateTime = LocalDateTime.now();
        else
            this.localDateTime = localDateTime;
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
}
