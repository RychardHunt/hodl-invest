package com.kenny.hodlinvest.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Map;

import com.kenny.hodlinvest.database.TokenDynamoDatabase;
import com.kenny.hodlinvest.exception.InvalidBodyFormatException;
import com.kenny.hodlinvest.exception.InvalidTokenException;
import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.model.Token;
import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;

public class Secure {

    public static String generateHash(String text){
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
        byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }

    public static String generateRandomID(int length){
        return new RandomStringGenerator.Builder()
                .withinRange('0', 'z')
                .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
                .build()
                .generate(length);
    }

    public static void checkToken(String username, Map<String, String> bodyMap, Map<String, Token> tokenMap){
        String token = bodyMap.get("token");

        if(token == null)
            throw new InvalidBodyFormatException("Token field is missing in message body. Message body is: " + bodyMap.toString());

        Token tok = tokenMap.get(username);
        if(tok == null)
            throw new InvalidTokenException("User is not logged in. Message body is: " + bodyMap.toString());

        if(!tok.getUsername().equals(username) || !tok.getToken().equals(token))
            throw new InvalidTokenException("Invalid username and/or token pair.");
    }

    public static void validateToken(Map<String, String> bodyMap, TokenDynamoDatabase dynamoDatabase){
        String username = bodyMap.get("username");
        String token = bodyMap.get("token");

        if(username == null)
            throw new InvalidBodyFormatException("USername field is missing in message body. Message body is: " + bodyMap.toString());
        if(token == null)
            throw new InvalidBodyFormatException("Token field is missing in message body. Message body is: " + bodyMap.toString());

        Token tok = dynamoDatabase.selectToken(token);
        if(tok == null)
            throw new InvalidTokenException("Invalid token. Message body is: " + bodyMap.toString());

        if(!tok.getUsername().equals(username) || !tok.getToken().equals(token))
            throw new InvalidTokenException("Invalid username and/or token pair.");
    }
}