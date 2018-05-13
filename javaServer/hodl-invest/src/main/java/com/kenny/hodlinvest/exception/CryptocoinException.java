package com.kenny.hodlinvest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CryptocoinException extends RuntimeException {
    public CryptocoinException(String message) {
        super(message);
    }
}
