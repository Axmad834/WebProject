package com.example.project.DTO;

import lombok.Data;

//it is an object through which we get data out of response
@Data
public class UserRegistrationDto {
    private String firstName;
    private String lastName;
    private String age;
    private String hobby;
    private String photoUrl;
    private String email;
    private String password; 

}
