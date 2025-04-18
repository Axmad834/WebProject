package com.example.project.Services;


import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Entities.User;
import com.example.project.Repositores.CoursesRepository;
import com.example.project.Repositores.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserCoursesService {

    private final CoursesRepository coursesRepository;
    private final UserRepository userRepository;
    private final CoursesService coursesService;

    public Courses addCourseToUser( Long id ,CoursesDto coursesDto){
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("No such user"));
        Courses courses = coursesRepository.findById(id).orElseThrow(()->new RuntimeException("No such course"));

        //We Do add User in Course (@ManyToOne)
        courses.setUser(user);
        coursesRepository.save(courses);

        //We Do add Courses intoCollection of users courses (@OneToMany)
        user.getCourses().add(courses);
        coursesRepository.save(courses);

        return courses;
    }

    public List<Courses> getUserCourses(Long userId){
        List<Courses> courses = coursesRepository.findByUserId(userId);
        return courses;
    }


    //courseId — нужен, чтобы найти курс
    //
    //userId — нужен, чтобы проверить владельца
    public void deleteCourseForUser(Long userId,Long courseId){
        Courses courses = coursesRepository.findById(courseId).orElseThrow(()->new RuntimeException("No such course"));

        if(!courses.getUser().getId().equals(userId)){
            throw new RuntimeException("User is not allowed to delete course");
        }

        coursesRepository.delete(courses);
    }



}
