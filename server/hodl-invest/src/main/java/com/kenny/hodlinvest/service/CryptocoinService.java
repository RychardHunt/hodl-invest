package com.kenny.hodlinvest.service;

import com.google.gson.*;
import com.kenny.hodlinvest.database.CryptocoinDatabase;
import com.kenny.hodlinvest.exception.CryptocoinException;
import com.kenny.hodlinvest.exception.CryptocoinUpdateException;
import com.kenny.hodlinvest.exception.UnknownServerException;
import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.model.Cryptocoin;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CryptocoinService {
    private CryptocoinDatabase database;
    private Map<String, Cryptocoin> coinMap;
    private long lastUpdated;

    @Autowired
    public CryptocoinService(@Qualifier("testCryptocoinDatabase") CryptocoinDatabase database){
        this.database = database;
        this.coinMap = new ConcurrentHashMap<>();
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

    public double getPrice(String cryptoTicker) {
        Cryptocoin cryptocoin = getInfo().get(cryptoTicker);
        if (cryptocoin == null) {
            throw new CryptocoinException(cryptoTicker + " is currently not supported.");
        }
        return cryptocoin.getPrice();
    }

    public Map<String, Cryptocoin> getInfo() {
        if (coinMap != null && (System.currentTimeMillis() - lastUpdated) < 300000) {
            return coinMap;
        }

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://api.coinmarketcap.com/v1/ticker/")
                .build();

        try {
            Response response = client.newCall(request).execute();

            ResponseBody responseBody = response.body();
            if (responseBody != null) {
                String cryptoInfo = responseBody.string();

                JsonParser jsonParser = new JsonParser();
                JsonArray jsonArray = jsonParser.parse(cryptoInfo).getAsJsonArray();

                HashMap<String, Cryptocoin> map = new HashMap<>();

                for (JsonElement jsonElement : jsonArray) {
                    JsonObject info = jsonElement.getAsJsonObject();

                    Cryptocoin cryptocoin = new Cryptocoin(info.get("name").getAsString(), info.get("symbol").getAsString(), info.get("price_usd").getAsDouble());
                    map.put(cryptocoin.getTicker(), cryptocoin);
                }
                coinMap = map;
                lastUpdated = System.currentTimeMillis();
                return map;
            }
        } catch (Exception e) {
            throw new UnknownServerException(e.getMessage());
        }
        throw new UnknownServerException("Unable to grab the latest cryptocurrencies, please try again.");
    }
}
