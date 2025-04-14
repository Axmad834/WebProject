package com.example.project.Controllers;

import com.example.project.DTO.LoginRequest;
import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    

    //For registration
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationDto dto){
        User registeredUser = userService.registerUser(dto);
        return ResponseEntity.ok(registeredUser);
    }


    @GetMapping("/register/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }


    //For login in existing acc
    @PostMapping("/login")
    public  ResponseEntity<?> loginUser(@RequestBody LoginRequest loginDto){
        try{
            boolean valid =  userService.loginUser(loginDto);
            if(valid){
                return ResponseEntity.ok(valid);
            }
            else{
                return ResponseEntity.badRequest().body("Wrong email or password");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()) ;
        }


    }







}
