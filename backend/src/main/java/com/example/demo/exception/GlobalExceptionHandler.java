package com.example.demo.exception;


import org.neo4j.driver.exceptions.Neo4jException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap; 
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
  
    @ExceptionHandler(Neo4jException.class)
    public ResponseEntity<Map<String, String>> handleDatabaseException(Neo4jException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Database Connection Failure");
        response.put("message", "CognoDB/Neo4j graph instance is unreachable or credentials are wrong: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Internal Application Error");
        response.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
