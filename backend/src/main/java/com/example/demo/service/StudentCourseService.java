package com.example.demo.service;
 

import com.example.demo.dto.RecommendationDTO;
import com.example.demo.model.Course;
import com.example.demo.model.Student;
import com.example.demo.repository.GraphRepository;
import org.springframework.stereotype.Service;
  
import java.util.List;

@Service
public class StudentCourseService {

    private final GraphRepository graphRepository;

    public StudentCourseService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public Student createStudent(Student student) {
        return graphRepository.saveStudent(student);
    }

    public List<Student> getAllStudents() {
        return graphRepository.findAllStudents();
    }

    public Course createCourse(Course course) {
        return graphRepository.saveCourse(course);
    }

    public List<Course> getAllCourses() {
        return graphRepository.findAllCourses();
    }

    public void enrollStudent(String studentId, String courseId) {
        graphRepository.enrollStudent(studentId, courseId);
    }

    public List<RecommendationDTO> getRecommendations(String studentId) {
        return graphRepository.getRecommendationsForStudent(studentId);
    }

    public Student getStudentById(String studentId) {
        return graphRepository.findStudentById(studentId);
    }
      
    
    public void seedInitialData() {
        graphRepository.seedDatabase();
    }
}