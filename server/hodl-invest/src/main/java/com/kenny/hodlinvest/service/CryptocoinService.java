package com.kenny.hodlinvest.service;

import com.kenny.hodlinvest.database.CryptocoinDatabase;
import com.kenny.hodlinvest.model.Cryptocoin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CryptocoinService {
    private CryptocoinDatabase database;

    @Autowired
    public CryptocoinService(@Qualifier("testCryptocoinDatabase") CryptocoinDatabase database){
        this.database = database;
    }

    public int addCryptocoin(String ticker, Cryptocoin cryptocoin){
        return database.insertCryptocoin(ticker, cryptocoin);
    }

    public Cryptocoin getCryptocoin(String ticker){
        return database.getCryptocoin(ticker);
    }

    public List<Cryptocoin> getAllCryptocoin(){
        return database.selectAllCryptocoin();
    }

    public int updateCryptocoin(String ticker, Cryptocoin cryptocoin){
        return database.updateCryptocoin(ticker, cryptocoin);
    }

    public int deleteCryptocoin(String ticker){
        return database.deleteCryptocoin(ticker);
    }
}
