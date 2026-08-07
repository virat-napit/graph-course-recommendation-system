import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/teachers')
      .then((res) => setTeachers(res.data || []))
      .catch(() => setError('Failed to load teachers from the backend.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-primary">Teachers</h2>
      {loading && <Loading message="Loading teachers..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="row g-4 mt-2">
          {teachers.map((teacher) => (
            <div className="col-md-6 col-lg-4" key={teacher.id || teacher.name}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{teacher.name || teacher.title}</h5>
                  <p className="text-muted mb-2">{teacher.email || 'No email provided'}</p>
                  <p className="card-text text-secondary">{teacher.department || 'Department not specified'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
