package com.kenny.hodlinvest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenny.hodlinvest.util.Secure;

public class Token {
    private String token;
    private String username;

    public Token(
            @JsonProperty("token") String token,
            @JsonProperty("username") String username){

        this.username = username;
        if(token == null)
          this.token = Secure.generateRandomID(64);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
