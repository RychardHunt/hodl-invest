package com.kenny.hodlinvest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CryptocoinUpdateException extends RuntimeException{
    public CryptocoinUpdateException(String message) {
        super(message);
    }
}
