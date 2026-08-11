package com.example.demo.controller;

import com.example.demo.dto.EnrollmentRequest;
import com.example.demo.dto.RecommendationDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Student;
import com.example.demo.service.StudentCourseService;
import org.springframework.http.ResponseEntity;  
import org.springframework.web.bind.annotation.*;

import java.util.List; 

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5175") // add fronted url 
public class ApiController {    

    private final StudentCourseService service;

    public ApiController(StudentCourseService service) {
        this.service = service;
    }  
  
    @PostMapping("/seed")  
    public ResponseEntity<String> seedDatabase() {
        service.seedInitialData();
        return ResponseEntity.ok("Database seeded successfully with initial Graph nodes and relationships.");
    }  
        

    @PostMapping("/students")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
    	
        return ResponseEntity.ok(service.createStudent(student)); 
    }
  
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.getAllStudents());  
    }
     
    @PostMapping("/courses")  
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(service.createCourse(course));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(service.getAllCourses());
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestBody EnrollmentRequest request) {
        service.enrollStudent(request.getStudentId(), request.getCourseId());
        return ResponseEntity.ok("Enrollment successfully created in Graph!");
    }

    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<List<RecommendationDTO>> getRecommendations(@PathVariable String studentId) {
        return ResponseEntity.ok(service.getRecommendations(studentId));
    }
}
