package com.kenny.hodlinvest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping("/")
    @ResponseBody
    public String instructions(){
        return "https://hodl-invest-server.herokuapp.com/api/v1/users/ to get all users.";
    }
}
