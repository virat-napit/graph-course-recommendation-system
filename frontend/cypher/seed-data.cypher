// Clear existing database nodes and relationships
MATCH (n) DETACH DELETE n;

// 1. Create Student Nodes
CREATE (s1:Student {id: 'S101', name: 'Ramji Napit', email: 'ramji@example.com'})
CREATE (s2:Student {id: 'S202', name: 'Ananya Sharma', email: 'ananya@example.com'})
CREATE (s3:Student {id: 'S303', name: 'Rahul Verma', email: 'rahul@example.com'})

// 2. Create Course Nodes
CREATE (c1:Course {id: 'C101', name: 'Spring Boot Architecture', code: 'CS501', description: 'Master microservices and REST APIs with Spring Boot.'})
CREATE (c2:Course {id: 'C202', name: 'Graph Databases & Cypher', code: 'CS502', description: 'Learn Neo4j, CognoDB, graph traversal, and query optimization.'})
CREATE (c3:Course {id: 'C303', name: 'Full Stack Web Development', code: 'CS503', description: 'Build modern React and Java full-stack applications.'})

// 3. Create Teacher Nodes
CREATE (t1:Teacher {id: 'T101', name: 'Dr. A. K. Sharma', department: 'Computer Science'})
CREATE (t2:Teacher {id: 'T202', name: 'Prof. Meera Patel', department: 'Data Engineering'})

// 4. Create Skill Nodes
CREATE (sk1:Skill {id: 'SK101', name: 'Java', category: 'Backend'})
CREATE (sk2:Skill {id: 'SK202', name: 'Cypher / Neo4j', category: 'Database'})
CREATE (sk3:Skill {id: 'SK303', name: 'React', category: 'Frontend'})
CREATE (sk4:Skill {id: 'SK404', name: 'REST API', category: 'Backend'})

// 5. Create Graph Relationships
// Enrollments
CREATE (s1)-[:ENROLLED_IN]->(c1)
CREATE (s2)-[:ENROLLED_IN]->(c2)

// Student Skills
CREATE (s1)-[:HAS_SKILL]->(sk1)
CREATE (s1)-[:HAS_SKILL]->(sk4)
CREATE (s2)-[:HAS_SKILL]->(sk2)

// Course Skill Requirements
CREATE (c1)-[:REQUIRES]->(sk1)
CREATE (c1)-[:REQUIRES]->(sk4)
CREATE (c2)-[:REQUIRES]->(sk2)
CREATE (c2)-[:REQUIRES]->(sk1)
CREATE (c3)-[:REQUIRES]->(sk3)

// Teachers Teaching Courses
CREATE (t1)-[:TEACHES]->(c1)
CREATE (t2)-[:TEACHES]->(c2);