// 1. Get All Students
MATCH (s:Student)
RETURN s.id AS studentId, s.name AS name, s.email AS email;

// 2. Get All Courses
MATCH (c:Course)
RETURN c.id AS courseId, c.name AS name, c.code AS code;

// 3. Get Student Enrolled Courses
MATCH (s:Student {id: $studentId})-[:ENROLLED_IN]->(c:Course)
RETURN s.name AS studentName, c.name AS enrolledCourse;

// 4. Multi-Hop Graph Traversal (Student -> Skill -> Required Course)
MATCH (s:Student {id: $studentId})-[:HAS_SKILL]->(sk:Skill)<-[:REQUIRES]-(c:Course)
RETURN s.name AS studentName, sk.name AS matchingSkill, c.name AS matchingCourse;

// 5. Multi-Hop Recommendation Query (Excludes already enrolled courses)
MATCH (s:Student {id: $studentId})-[:HAS_SKILL]->(sk:Skill)<-[:REQUIRES]-(recCourse:Course)
WHERE NOT (s)-[:ENROLLED_IN]->(recCourse)
RETURN DISTINCT recCourse.id AS id, recCourse.name AS name, recCourse.description AS description, sk.name AS matchedSkill;