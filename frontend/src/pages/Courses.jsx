import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/courses')
      .then((res) => {
        setCourses(res.data || []);
      })
      .catch(() => {
        setError('Failed to load courses from the backend.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-primary">Courses</h2>
      <p className="text-muted">Browse the courses stored in your backend.</p>

      {loading && <Loading message="Loading courses..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="row g-4 mt-2">
          {courses.map((course) => (
            <div className="col-md-6 col-lg-4" key={course.id || course.title}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.title || course.name}</h5>
                  <p className="text-muted mb-2">{course.category || 'General'}</p>
                  <p className="card-text text-secondary">
                    {course.description || 'Course details available from the backend.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
