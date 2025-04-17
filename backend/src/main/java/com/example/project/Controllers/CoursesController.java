package com.example.project.Controllers;

import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Repositores.CoursesRepository;
import com.example.project.Services.CoursesServise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api")
public class CoursesController {
    private final CoursesServise coursesServise;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addCourse")
    public ResponseEntity<?> addCourse(@RequestBody CoursesDto coursesDto){
        Courses course = coursesServise.addCourse(coursesDto);
        return ResponseEntity.ok().body(course);
    }

    @GetMapping("/getCourse")
    public List<Courses> getAllCourses(){
        return coursesServise.getAllCourses();
    }


    @PreAuthorize("hasRole('ADMIN')") 
    @PutMapping("courses/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id , @RequestBody CoursesDto coursesDto){
        Courses course = coursesServise.updateCourse(id,coursesDto);
        return ResponseEntity.ok().body(course);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id){
        coursesServise.deleteCourse(id);
        return ResponseEntity.ok().build();
    }


}
