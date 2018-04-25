package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.exception.CryptocoinException;
import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.service.CryptocoinService;
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
