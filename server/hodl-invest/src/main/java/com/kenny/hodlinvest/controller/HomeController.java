package com.kenny.hodlinvest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping("/")
    @ResponseBody
    public String instructions(){
        return "API documentation can be found here: https://github.com/RychardHunt/hodl-invest/wiki/Project-Documentation";
    }
}
