import React from 'react';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaGraduationCap, FaLightbulb } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold text-primary mb-3">
            Graph Database Student Course Recommendation System
          </h1>
          <p className="lead text-secondary mb-4">
            Powered by CognoDB / Neo4j graph relationships. Experience real-time multi-hop graph traversal for dynamic recommendations.
          </p>
          <div className="d-flex gap-3">
            <Link to="/students" className="btn btn-primary btn-lg">Manage Students</Link>
            <Link to="/recommendations" className="btn btn-outline-primary btn-lg">View Recommendations</Link>
          </div>
        </div>
        <div className="col-lg-5 text-center mt-4 mt-lg-0">
          <div className="p-5 bg-primary bg-opacity-10 rounded-circle d-inline-block">
            <FaProjectDiagram size={120} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4 text-center">
            <FaGraduationCap size={40} className="text-primary mb-3 mx-auto" />
            <h5>Student Profiles</h5>
            <p className="text-muted">Track students, enrolled courses, and acquired skill sets.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4 text-center">
            <FaProjectDiagram size={40} className="text-primary mb-3 mx-auto" />
            <h5>Graph Traversal</h5>
            <p className="text-muted">Leverage multi-hop graph patterns to connect skills, courses, and instructors.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-4 text-center">
            <FaLightbulb size={40} className="text-primary mb-3 mx-auto" />
            <h5>Smart Recommendations</h5>
            <p className="text-muted">Recommend courses based on skill overlap and graph paths.</p>
          </div>
        </div>
      </div>
    </div>
  );
}