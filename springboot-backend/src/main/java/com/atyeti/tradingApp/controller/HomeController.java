package com.atyeti.tradingApp.controller;

import com.atyeti.tradingApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins="*")
@RestController
public class HomeController {

    @Autowired
    UserService userService;



    @PostMapping("/signin")
    public Map<String, String> login(@RequestBody Map<String, String> userInput) {

        return userService.login(userInput);

    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> userInputs) {

        return userService.register(userInputs);
    }

}
