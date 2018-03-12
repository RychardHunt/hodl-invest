package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.service.CryptocoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
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
    public List<Cryptocoin> getAllCryptocoins(){
        return cryptocoinService.getAllCryptocoin();
    }

    public void addNewCryptocoin(){

    }
}
