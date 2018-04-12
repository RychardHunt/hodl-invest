package com.kenny.hodlinvest.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kenny.hodlinvest.database.CryptocoinDatabase;
import com.kenny.hodlinvest.exception.CryptocoinException;
import com.kenny.hodlinvest.exception.CryptocoinUpdateException;
import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.model.Cryptocoin;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Properties;

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
        return database.selectAllCryptocoins();
    }

    public int updateCryptocoin(String ticker, Cryptocoin cryptocoin){
        return database.updateCryptocoin(ticker, cryptocoin);
    }

    public int deleteCryptocoin(String ticker){
        return database.deleteCryptocoin(ticker);
    }

    public double getCryptocoinPrice(String ticker){
        if(database.getCryptocoin(ticker) == null){
            throw new CryptocoinException("Ticker: " + ticker + " is not supported.");
        }
            return database.getCryptocoin(ticker).getPrice();
    }

    public double getPriceFromCoinApi(String ticker){
        try{
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url("https://rest.coinapi.io/v1/exchangerate/" + ticker + "/USD")
                    .addHeader("X-CoinAPI-Key", "2F86E06D-87CC-405E-AA50-EE0C02CE983F")
                    .build();

            Response response = client.newCall(request).execute();

            if(!response.isSuccessful()){
                throw new CryptocoinUpdateException("Api call response failed. Ticker is most likely not supported.");
            }
            System.out.println(response.toString());
            String jsonResponse = response.body().string();
            System.out.println(jsonResponse);
            System.out.println(response.message());

            JsonParser jsonParser = new JsonParser();
            JsonObject obj = jsonParser.parse(jsonResponse).getAsJsonObject();
            Double rate = obj.get("rate").getAsDouble();
            if(rate == null){
                throw new CryptocoinUpdateException("Unable to retrieve cryptocoin rate. Rate is null");
            }

            System.out.println(rate);
            return rate;
        } catch(IOException e){
            throw new UserException("Failed to get price from coin api");
        }
    }
}
