package com.example.project.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursesDto {
    private Long id;
    private String title;
    private String courseDescription;
    private String imageUrl;
}
