package com.example.project;

import com.example.project.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@RequiredArgsConstructor
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx, UserService userService) {
        return args -> {
            // Пример присваивания роли ADMIN пользователю с ID 1
            userService.giveAdminRoleToUser(8L);  // Здесь 1L - это ID пользователя, которому ты хочешь дать роль
            System.out.println("User with ID 1 is now an ADMIN");
        };
    }
}
