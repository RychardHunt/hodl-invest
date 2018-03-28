package com.kenny.hodlinvest.controller;

import com.kenny.hodlinvest.exception.UserException;
import com.kenny.hodlinvest.exception.UserNotFoundException;
import com.kenny.hodlinvest.model.Cryptocoin;
import com.kenny.hodlinvest.model.Transaction;
import com.kenny.hodlinvest.model.User;
import com.kenny.hodlinvest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin()
    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @CrossOrigin()
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
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void addNewUser(@RequestBody User user){
        if(userService.userExists(user.getUsername())){
            throw new UserException("Username already exists.");
        }
        userService.addUser(user.getUsername(), user);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            path = "{username}"
    )
    public void deleteUserByName(@PathVariable String username){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        userService.deleteUserByName(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "{username}/transactions/{amount}"
    )
    public void updateUserPlayMoney(@PathVariable String username, @PathVariable double amount){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        userService.updateUserPlayMoney(username, amount);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = "{username}/transactions",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void addTransaction(@RequestBody Cryptocoin cryptocoin, @PathVariable("username") String username){
        if(!userService.userExists(username))
            throw new UserNotFoundException("User does not exist");

        System.out.println("Added transaction: " + cryptocoin.getTicker() + " with price: " + cryptocoin.getPrice() + " to user: " + username);
        userService.addTransaction(username, cryptocoin.getTicker(), cryptocoin.getPrice());
    }

    @CrossOrigin()
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
}
