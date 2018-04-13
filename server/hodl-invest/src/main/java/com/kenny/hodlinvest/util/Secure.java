package com.kenny.hodlinvest.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Map;

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

    public static void checkToken(String username, Map<String, String> token, Map<String, Token> tokenMap){
        Token tok = tokenMap.get(token.get("token"));
        if(tok == null)
            throw new InvalidTokenException("Token is missing or is invalid. Request body is: " + token.toString());

        if(!tok.getUsername().equals(username))
            throw new UserException("Unauthorized requests to user.");
    }
}