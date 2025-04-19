package com.example.project.Controllers;


import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Entities.User;
import com.example.project.Services.UserCoursesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class UserCoursesController {

    private final UserCoursesService userCoursesService;

    @PostMapping("/addCourseToUser")
    public ResponseEntity<?> addCourseToUser( @RequestParam Long id,@RequestBody CoursesDto coursesDto ) {
        System.out.println("User ID: " + id);
        System.out.println("Course Data: " + coursesDto);
        Courses course = userCoursesService.addCourseToUser(id,coursesDto);
        return ResponseEntity.ok().body(course);
    }



    //validation check if is it true user of courses
    @GetMapping("/getUserCourses")
    public List<Courses> getUserCourses(@AuthenticationPrincipal User currentUser) {
        return userCoursesService.getUserCourses(currentUser.getId());
    }


    @GetMapping("/{userId}")
    public List<Courses> getUserCourses(@PathVariable Long userId){
        return userCoursesService.getUserCourses(userId);
    }

    @DeleteMapping("/delette/{userId}")
    public void deleteCourseFromDashboard(@PathVariable Long userId , @PathVariable Long courseId ){
        userCoursesService.deleteCourseForUser(userId ,courseId);
    }



}
