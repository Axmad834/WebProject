package com.example.project.Controllers;

import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationDto dto){
        User registeredUser = userService.registerUser(dto);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/register")
    public ResponseEntity<UserRegistrationDto> registerUser(){
        UserRegistrationDto dto = new UserRegistrationDto();
        return ResponseEntity.ok(dto);
    }





}
