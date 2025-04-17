package com.example.project.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursesDto {
    @NotNull
    private String title;
    private String description;
    private String ImageUrl;
}
