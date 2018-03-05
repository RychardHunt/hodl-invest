package com.kenny.hodlinvest.controller;

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

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{username}"
    )
    public User getUserByName(@PathVariable("username") String username){
        return userService.getUserByName(username);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void addNewUser(@RequestBody User user){
        userService.addUser(user.getUsername(), user);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            path = "{username}"
    )
    public void deleteUserByName(@PathVariable("username") String username){
        userService.deleteUserByName(username);
    }
}
