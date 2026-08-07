# Student Course Recommendation System (CognoDB / Neo4j)

A full-stack graph database web application built using **Spring Boot**, **React.js**, and **CognoDB Cloud**.

---

## 1. Project Description
This application provides dynamic course recommendations to students by performing multi-hop graph traversals across students, skills, and course prerequisites stored in CognoDB.

## 2. Use Case
Educational platforms need real-time recommendations tailored to student skill sets. Relational databases struggle with deep multi-table JOINs, whereas a graph database models skill mappings naturally.

## 3. Why a Graph Database?
- **No Complex JOINs:** Connects nodes (`Student`, `Course`, `Skill`, `Teacher`) directly using explicit relationships.
- **Constant-Time Traversal:** Traverses paths like `(:Student)-[:HAS_SKILL]->(:Skill)<-[:REQUIRES]-(:Course)` instantly regardless of total data volume.

## 4. Technology Stack
- **Backend:** Spring Boot, Java 17/21, Spring Data Neo4j
- **Frontend:** React.js, Vite, Bootstrap, Axios
- **Database:** CognoDB Cloud / Neo4j (Cypher)

## 5. Graph Data Model Diagram
```text
  (Student) ----------[:ENROLLED_IN]---------> (Course)
      |                                           |
 [:HAS_SKILL]                                [:REQUIRES]
      |                                           |
      v                                           v
   (Skill) <---------------------------------- (Skill)

  (Teacher) -----------[:TEACHES]------------> (Course)
