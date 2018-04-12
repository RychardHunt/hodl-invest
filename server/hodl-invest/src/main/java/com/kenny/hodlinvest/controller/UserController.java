package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.exception.UserNotFoundException;
import com.kenny.hodlinvest.model.Token;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import com.kenny.hodlinvest.service.CryptocoinService;
import com.kenny.hodlinvest.service.TransactionService;
import com.kenny.hodlinvest.service.UserService;
import com.kenny.hodlinvest.util.Secure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "https://hodl-invest.herokuapp.com/")
public class UserController {

    private final UserService userService;
    private final CryptocoinService cryptocoinService;
    private final TransactionService transactionService;
    private final Map<String, Token> tokenMap = new HashMap<>();

    @Autowired
    public UserController(UserService userService, CryptocoinService cryptocoinService, TransactionService transactionService) {
        this.userService = userService;
        this.cryptocoinService = cryptocoinService;
        this.transactionService = transactionService;
    }

    @ResponseBody
    @RequestMapping(
            method = RequestMethod.GET
    )
    public String message(){
        return "API documentation can be found here: https://github.com/RychardHunt/hodl-invest/wiki/Project-Documentation";
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{username}"
    )
    public User getUserByName(@PathVariable String username){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

            return userService.getUserByName(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void addNewUser(@RequestBody User user){
        if(user.getUsername() == null || user.getPasswordHash().equals(""))
            throw new UserException("Username or password is null. Please put in a username and password field in order to create the user");

        if(userService.userExists(user.getUsername())){
            throw new UserException("Username already exists.");
        }

        userService.addUser(user.getUsername(), user);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            path = "{username}"
    )
    public void deleteUserByName(@PathVariable String username,@RequestBody Map<String, String> token){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        Secure.checkToken(username, token, tokenMap);

        tokenMap.remove(token);
        userService.deleteUserByName(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "{username}/transactions/{amount}"
    )
    public void updateUserPlayMoney(@PathVariable String username, @PathVariable double amount, @RequestBody Map<String, String> token){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        Secure.checkToken(username, token, tokenMap);

        userService.updateUserPlayMoney(username, amount);
    }

//    @RequestMapping(
//            method = RequestMethod.POST,
//            path = "{username}/transactions",
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
//    public void addTransaction(@RequestBody Map<String, String> body, @PathVariable("username") String username){
//        Secure.checkToken(username, body, tokenMap);
//
//        if(!userService.userExists(username))
//            throw new UserNotFoundException("User does not exist");
//
//        try{
//            String ticker = body.get("ticker");
//            double price = Double.parseDouble(body.get("price"));
//            if(body.get("ticker") == null || body.get("price") == null){
//                throw new InvalidInputException("Please enter the ticker and price in JSON format. Request body is: + token.toString()");
//            }
//
//            Cryptocoin cryptocoin = new Cryptocoin(ticker, price);
//
//            System.out.println("Added transaction: " + cryptocoin.getTicker() + " with price: " + cryptocoin.getPrice() + " to user: " + username);
//            userService.addTransaction(username, cryptocoin.getTicker(), cryptocoin.getPrice());
//
//        } catch (NumberFormatException e){
//            throw new InvalidInputException("Price is not a number. Price: " + body.get("price"));
//        }
//    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{username}/transactions"
    )
    public List<Transaction> getUserTransactions(@PathVariable String username){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        return userService.getUserTransactions(username);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{username}/portfolio"
    )
    public Map<String, Double> getUserPortfolio(@PathVariable String username){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        return userService.getPortfolio(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "login"
    )
    public Token userLogin(@RequestBody Map<String, String> userInfo){
        String username = userInfo.get("username");
        String password = userInfo.get("password");

        if(username == null || password == null)
            throw new UserException("Username or password is null.");

        System.out.println("Attempting to login user " + username + " password " + password);
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        if(tokenMap.get(username) != null)
            throw new UserException("User already logged in.");

        if(userService.authenticateUser(username, password)){
            Token token = new Token(null, username);
            tokenMap.put(token.getToken(), token);
            return token;
        } else{
            throw new UserException("Failed to authenticate user.");
        }
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "logout"
    )
    public void userLogout(@RequestBody Map<String, String> tokenJson){
        String token = tokenJson.get("token");
        System.out.println("token is " + token);
        Token curToken = tokenMap.get(token);
        if(curToken == null)
            throw new UserException("Invalid token to logout.");
        else{
            tokenMap.remove(token);
            System.out.println("Successfully logged out user " + curToken.getUsername());
        }
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "buy/{ticker}/{amount}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void buyCryptocoin(@RequestBody Map<String, String> bodyMap, @PathVariable("ticker") String ticker, @PathVariable("amount") double amount){
        System.out.println("Buy endpoint reached");
        String username = bodyMap.get("username");
        if(username == null || !userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        Secure.checkToken(username, bodyMap, tokenMap);

        transactionService.processBuyRequest(userService.getUserByName(username), ticker.toUpperCase(), amount, cryptocoinService.getPriceFromCoinApi(ticker.toUpperCase()));
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "sell/{ticker}/{amount}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void sellCryptocoin(@RequestBody Map<String, String> bodyMap, @PathVariable String ticker, @PathVariable double amount){
        System.out.println("Sell endpoint reached");
        String username = bodyMap.get("username");

        if(username == null || !userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        Secure.checkToken(username, bodyMap, tokenMap);

        transactionService.processSellRequest(userService.getUserByName(username), ticker.toUpperCase(), amount, cryptocoinService.getPriceFromCoinApi(ticker.toUpperCase()));
    }
}
