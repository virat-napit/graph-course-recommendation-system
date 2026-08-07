import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../services/studentService';
import { getRecommendations } from '../services/recommendationService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Recommendations() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    getAllStudents()
      .then((res) => {
        setStudents(res.data || []);
        setNotice(res.fromFallback ? 'Backend unavailable. Showing demo data.' : null);
      })
      .catch(() => setError('Failed to fetch students list.'));
  }, []);

  const handleSelectStudent = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (!studentId) {
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError(null);
    getRecommendations(studentId)
      .then((res) => {
        const nextRecommendations = res.data || [];
        setRecommendations(nextRecommendations);
        setNotice(res.fromFallback ? 'No recommendations returned by the backend. Showing an empty state.' : null);
      })
      .catch(() => setError('Failed to fetch recommendations for selected student.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">Graph Course Recommendations</h2>

      <div className="card p-4 shadow-sm mb-4">
        <label htmlFor="studentSelect" className="form-label fw-bold">Select Student:</label>
        <select
          id="studentSelect"
          className="form-select form-select-lg"
          value={selectedStudentId}
          onChange={handleSelectStudent}
        >
          <option value="">-- Choose a Student --</option>
          {students.map((s) => (
            <option key={s.id || s.studentId} value={s.id || s.studentId}>
              {s.name} ({s.email || s.id})
            </option>
          ))}
        </select>
      </div>

      {loading && <Loading message="Traversing graph database for recommendations..." />}
      {error && <ErrorMessage message={error} />}
      {notice && (
        <div className="alert alert-warning" role="alert">
          {notice}
        </div>
      )}

      {!loading && !error && selectedStudentId && recommendations.length === 0 && (
        <EmptyState title="No Recommendations Found" description="This student already matches all courses or has no matching graph paths." />
      )}

      {!loading && !error && recommendations.length > 0 && (
        <div className="row g-4">
          {recommendations.map((course, idx) => (
            <div className="col-md-6 col-lg-4" key={course.id || idx}>
              <div className="card h-100 border-0 shadow-sm border-top border-4 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.name || course.title}</h5>
                  <p className="card-text text-muted">{course.description || "Recommended based on your graph skill traversal."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// src/routes/AppRoutes.jsx