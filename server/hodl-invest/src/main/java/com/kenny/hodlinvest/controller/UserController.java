package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.database.TokenDynamoDatabase;
import com.kenny.hodlinvest.database.UserDynamoDatabase;
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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = {"https://hodl-invest.herokuapp.com", "http://localhost:3000"})
public class UserController {

    private final UserService userService;
    private final CryptocoinService cryptocoinService;
    private final TransactionService transactionService;
//    private final Map<String, Token> tokenMap = new HashMap<>();

    @Autowired
    private TokenDynamoDatabase tokenDynamoDatabase;
    @Autowired
    private UserDynamoDatabase userDynamoDatabase;

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
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{username}"
    )
    public User getUserByName(@PathVariable String username){
            return userDynamoDatabase.selectUser(username);
//            return userService.getUserByName(username);
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
        userDynamoDatabase.insertUser(user);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            path = "{username}"
    )
    public void deleteUserByName(@PathVariable String username,@RequestBody Map<String, String> bodyMap){
        Secure.validateToken(bodyMap, tokenDynamoDatabase);
        userService.deleteUserByName(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "{username}/transactions/{amount}"
    )
    public void updateUserPlayMoney(@PathVariable String username, @PathVariable double amount, @RequestBody Map<String, String> bodyMap){
        Secure.validateToken(bodyMap, tokenDynamoDatabase);
//        userService.updateUserPlayMoney(username, amount);
        User user = userDynamoDatabase.selectUser(username);
        userDynamoDatabase.updateUserMoney(username, amount);
    }

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
    public Token userLogin(@RequestBody Map<String, String> bodyMap){
        String username = bodyMap.get("username");
        String password = bodyMap.get("password");

        if(username == null || password == null)
            throw new UserException("Username or password is null.");

        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        if(userService.authenticateUser(username, password)){
            Token token = new Token(null, username);
            tokenDynamoDatabase.insertToken(token);
            return token;
        } else{
            throw new UserException("Failed to authenticate user.");
        }
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "logout"
    )
    public void userLogout(@RequestBody Map<String, String> bodyMap){
        Secure.validateToken(bodyMap, tokenDynamoDatabase);
        tokenDynamoDatabase.deleteToken(bodyMap.get("token"), bodyMap.get("username"));
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "buy/{ticker}/{amount}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void buyCryptocoin(@RequestBody Map<String, String> bodyMap, @PathVariable("ticker") String ticker, @PathVariable("amount") double amount){
        Secure.validateToken(bodyMap, tokenDynamoDatabase);
        transactionService.processBuyRequest(userService.getUserByName(bodyMap.get("username")), cryptocoinService.getInfo().get(ticker.toUpperCase()).getName(), ticker.toUpperCase(), amount,  cryptocoinService.getInfo().get(ticker.toUpperCase()).getPrice());
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "sell/{ticker}/{amount}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void sellCryptocoin(@RequestBody Map<String, String> bodyMap, @PathVariable String ticker, @PathVariable double amount){
        Secure.validateToken(bodyMap, tokenDynamoDatabase);
        transactionService.processSellRequest(userService.getUserByName(bodyMap.get("username")),  cryptocoinService.getInfo().get(ticker.toUpperCase()).getName(), ticker.toUpperCase(), amount, cryptocoinService.getInfo().get(ticker.toUpperCase()).getPrice());
    }
}
