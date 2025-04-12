package com.example.project.Services;

import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
//import com.example.project.Security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
//    private final JwtTokenUtil jwtTokenUtil;


    public User registerUser(UserRegistrationDto dto){
        if(userRepository.findByEmail(dto.getEmail()).isPresent()){
            throw new RuntimeException ("User already exists");
        }

        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setHobby(dto.getHobby());
        user.setPhotoUrl(dto.getPhotoUrl());
        user.setEmail(dto.getEmail());
        user.setPassword(encodedPassword);


        return userRepository.save(user);
    }


}
