package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Cryptocoin;

import java.util.List;
import java.util.Date;

public interface CoinHistoryDatabase {
    void makeHistory(String coinName, Date date, int price);
    double getPrice(String coinName, Date date);
}
