package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Cryptocoin {
    @Id
    private String ticker;
    private double price;

    public Cryptocoin(
            @JsonProperty("ticker") String ticker,
            @JsonProperty("price") double price) {
        this.ticker = ticker;
        this.price = price;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Cryptocoin{" +
                "ticker='" + ticker + '\'' +
                ", price=" + price +
                '}';
    }
}
