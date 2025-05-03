package com.kasia.zad7.controller;

import com.kasia.zad7.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/user")
    public User getUser() {
        return new User("John", 30);
    }
}
