package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.exception.CryptocoinException;
import com.kenny.hodlinvest.exception.UnknownServerException;
import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.service.CryptocoinService;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cryptocoins")
@CrossOrigin(origins = {"https://hodl-invest.herokuapp.com", "http://localhost:3000"})
public class CryptocoinController {
    private final CryptocoinService cryptocoinService;

    @Autowired
    public CryptocoinController(CryptocoinService cryptocoinService){
        this.cryptocoinService = cryptocoinService;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, Cryptocoin> getAllCryptocoins(){
        return cryptocoinService.getInfo();
    }

    @RequestMapping(
            method = RequestMethod.GET,
            path = "/verbose",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public String getVerboseCryptcoins() {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://api.coinmarketcap.com/v1/ticker/")
                .build();

        try {
            Response response = client.newCall(request).execute();

            okhttp3.ResponseBody responseBody = response.body();
            if (responseBody != null) {
                String cryptoInfo = responseBody.string();
                return cryptoInfo;
            } else{
                throw new UnknownServerException("API call to coin market cap failed.");
            }
        } catch (Exception e) {
            throw new UnknownServerException(e.getMessage());
        }
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{ticker}"
    )
    public double getCryptcoinPrice(@PathVariable String ticker){
        Cryptocoin cryptocoin =  cryptocoinService.getInfo().get(ticker.toUpperCase());

        if(cryptocoin == null){
            throw new CryptocoinException("Invalid ticker.");
        }
        return cryptocoin.getPrice();
    }
}
