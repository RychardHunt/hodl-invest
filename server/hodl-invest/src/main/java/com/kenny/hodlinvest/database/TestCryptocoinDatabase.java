package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Cryptocoin;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("testCryptocoinDatabase")
public class TestCryptocoinDatabase implements CryptocoinDatabase {
    private Map<String, Cryptocoin> database;

    public TestCryptocoinDatabase(){
        database = new HashMap<>();
        insertCryptocoin("BTC", new Cryptocoin("BTC", 9250.00));
        insertCryptocoin("ETH", new Cryptocoin("ETH", 712.65));
        insertCryptocoin("XRP", new Cryptocoin("XRP", .0818816));
    }

    @Override
    public int insertCryptocoin(String ticker, Cryptocoin cryptocoin) {
        database.put(ticker, cryptocoin);
        return 1;
    }

    @Override
    public Cryptocoin getCryptocoin(String ticker) {
        return database.get(ticker);
    }

    @Override
    public List<Cryptocoin> selectAllCryptocoins() {
        return new ArrayList<>(database.values());
    }

    @Override
    public int updateCryptocoin(String ticker, Cryptocoin cryptocoin) {
        database.put(ticker, cryptocoin);
        return 1;
    }

    @Override
    public int deleteCryptocoin(String ticker) {
        database.remove(ticker);
        return 1;
    }
}
