package com.kenny.hodlinvest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class UnknownServerException extends RuntimeException {
    public UnknownServerException(String message) {
        super(message);
    }
}
