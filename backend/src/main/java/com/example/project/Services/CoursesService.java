package com.example.project.Services;

import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Repositores.CoursesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoursesService {
    private final CoursesRepository coursesRepository;


    //for post method
    public Courses addCourse(CoursesDto coursesDto){
        Courses courses = new Courses();

        courses.setTitle(coursesDto.getTitle());
        courses.setCourseDescription(coursesDto.getDescription());
        courses.setImageUrl(coursesDto.getImageUrl());

        return coursesRepository.save(courses);
    }


    //for get method
    public List<Courses> getAllCourses(){
        return coursesRepository.findAll();
    }



    //for put method
    public Courses updateCourse(Long id,CoursesDto courseDto){
        Courses course = coursesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        course.setTitle(courseDto.getTitle());
        course.setCourseDescription(courseDto.getDescription());
        course.setImageUrl(courseDto.getImageUrl());

        return coursesRepository.save(course);
    }

    //for delete mehtod
    public void deleteCourse(Long id){
        coursesRepository.deleteById(id);
    }




}
