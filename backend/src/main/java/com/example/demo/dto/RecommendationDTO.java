package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationDTO {
	
	private String courseId;
    private String courseTitle;
    private String category;
    private String reason;    // e.g., "Requires skills you possess" or "Popular among peers"
    private long matchingSkillsCount;
    
    
 
}
