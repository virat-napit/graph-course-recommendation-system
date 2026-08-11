package com.example.demo.repository;



import com.example.demo.dto.RecommendationDTO;
import com.example.demo.model.*;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.neo4j.driver.Values;
import org.neo4j.driver.Record;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;   
import java.util.List;

@Repository
public class GraphRepository {

    private final Driver driver;

    public GraphRepository(Driver driver) {
        this.driver = driver;
    }

    // Save Student Node
    public Student saveStudent(Student student) {
        String cypher = "MERGE (s:Student {id: $id}) " +
                        "ON CREATE SET s.name = $name, s.email = $email " +
                        "ON MATCH SET s.name = $name, s.email = $email " +
                        "RETURN s.id AS id, s.name AS name, s.email AS email";
        try (Session session = driver.session()) {
            session.run(cypher, Values.parameters("id", student.getId(), "name", student.getName(), "email", student.getEmail()));
            return student;
        }
    }

    // Get All Students
    public List<Student> findAllStudents() {
        String cypher = "MATCH (s:Student) RETURN s.id AS id, s.name AS name, s.email AS email";
        try (Session session = driver.session()) {
            return session.run(cypher).list(record -> 
                new Student(record.get("id").asString(), record.get("name").asString(), record.get("email").asString())
            );
        }
    }

    public Student findStudentById(String studentId) {
        String cypher = "MATCH (s:Student {id: $studentId}) RETURN s.id AS id, s.name AS name, s.email AS email";
        try (Session session = driver.session()) {
            var result = session.run(cypher, Values.parameters("studentId", studentId)).singleOrNull();
            if (result == null) {
                return null;
            }
            return new Student(result.get("id").asString(), result.get("name").asString(), result.get("email").asString());
        }
    }

    // Save Course Node
    public Course saveCourse(Course course) {
        String cypher = "MERGE (c:Course {id: $id}) " +
                        "ON CREATE SET c.title = $title, c.category = $category " +
                        "ON MATCH SET c.title = $title, c.category = $category " +
                        "RETURN c.id AS id, c.title AS title, c.category AS category";
        try (Session session = driver.session()) {
            session.run(cypher, Values.parameters("id", course.getId(), "title", course.getTitle(), "category", course.getCategory()));
            return course;
        }
    }

    // Get All Courses
    public List<Course> findAllCourses() {
        String cypher = "MATCH (c:Course) RETURN c.id AS id, c.title AS title, c.category AS category";
        try (Session session = driver.session()) {
            return session.run(cypher).list(record -> 
                new Course(record.get("id").asString(), record.get("title").asString(), record.get("category").asString())
            );
        }
    }

    // Create ENROLLED_IN Relationship
    public void enrollStudent(String studentId, String courseId) {
        String cypher = "MATCH (s:Student {id: $studentId}), (c:Course {id: $courseId}) " +
                        "MERGE (s)-[:ENROLLED_IN]->(c)";
        try (Session session = driver.session()) {
            session.run(cypher, Values.parameters("studentId", studentId, "courseId", courseId));
        }
    }

    // Multi-Hop Cypher Traversal Recommendation Engine
    // Logic: Find courses that require skills the student possesses via HAS_SKILL, 
    // OR courses enrolled in by students who share skills, excluding already enrolled courses.
    public List<RecommendationDTO> getRecommendationsForStudent(String studentId) {
        String cypher = "MATCH (s:Student {id: $studentId})-[:HAS_SKILL]->(sk:Skill)<-[:REQUIRES]-(recCourse:Course) " +
                        "WHERE NOT (s)-[:ENROLLED_IN]->(recCourse) " +
                        "WITH recCourse, COUNT(sk) AS matchingSkills " +
                        "RETURN recCourse.id AS courseId, recCourse.title AS title, recCourse.category AS category, " +
                        "matchingSkills, 'Requires skills you possess' AS reason " +
                        "ORDER BY matchingSkills DESC";

        try (Session session = driver.session()) {
            return session.run(cypher, Values.parameters("studentId", studentId)).list(record -> 
                new RecommendationDTO(  
                    record.get("courseId").asString(),
                    record.get("title").asString(),
                    record.get("category").asString(),
                    record.get("reason").asString(),
                    record.get("matchingSkills").asLong()  
                )
            );
        }  
    }

    // Seed Data Script
    public void seedDatabase() {
        String cypher = "CREATE (s1:Student {id: 'S1', name: 'Ramji', email: 'ramji@wexa.ai'}), " +
                        "       (s2:Student {id: 'S2', name: 'Jyoti', email: 'priya@wexa.ai'}), " +
                        "       (c1:Course {id: 'C1', title: 'Spring Boot Microservices', category: 'Backend'}), " +
                        "       (c2:Course {id: 'C2', title: 'Graph Databases with Neo4j', category: 'Database'}), " +
                        "       (c3:Course {id: 'C3', title: 'React UI Architecture', category: 'Frontend'}), " +
                        "       (t1:Teacher {id: 'T1', name: 'Dr. Sharma', specialty: 'Distributed Systems'}), " +
                        "       (sk1:Skill {id: 'SK1', name: 'Java'}), " +
                        "       (sk2:Skill {id: 'SK2', name: 'Cypher'}), " +
                        "       (sk3:Skill {id: 'SK3', name: 'JavaScript'}), " +
                        "       (s1)-[:HAS_SKILL]->(sk1), " +
                        "       (s1)-[:HAS_SKILL]->(sk2), " +
                        "       (s2)-[:HAS_SKILL]->(sk3), " +
                        "       (c1)-[:REQUIRES]->(sk1), " +
                        "       (c2)-[:REQUIRES]->(sk2), " +
                        "       (c3)-[:REQUIRES]->(sk3), " +
                        "       (t1)-[:TEACHES]->(c1), " +
                        "       (s1)-[:ENROLLED_IN]->(c1)";

        try (Session session = driver.session()) {
            session.run("MATCH (n) DETACH DELETE n"); // Clean DB
            session.run(cypher); // Seed DB
        }
    }
}
