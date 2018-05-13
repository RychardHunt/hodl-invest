package com.kenny.hodlinvest.database;

import com.kenny.hodlinvest.model.Cryptocoin;

import java.util.List;

public interface CryptocoinDatabase {
    int insertCryptocoin(String ticker, Cryptocoin cryptocoin);
    Cryptocoin getCryptocoin(String ticker);
    List<Cryptocoin> selectAllCryptocoins();
    int updateCryptocoin(String ticker, Cryptocoin cryptocoin);
    int deleteCryptocoin(String ticker);
}
