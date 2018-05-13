package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Cryptocoin {
    @Id
    private String name;
    private String ticker;
    private double price;

    public Cryptocoin(
            @JsonProperty("name") String name,
            @JsonProperty("ticker") String ticker,
            @JsonProperty("price") double price) {
        this.name = name;
        this.ticker = ticker.toUpperCase();
        this.price = price;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker.toUpperCase();
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Cryptocoin{" +
                "ticker='" + ticker + '\'' +
                ", price=" + price +
                '}';
    }
}
