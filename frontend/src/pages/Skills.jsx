import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/skills')
      .then((res) => setSkills(res.data || []))
      .catch(() => setError('Failed to load skills from the backend.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-primary">Skills</h2>
      {loading && <Loading message="Loading skills..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="row g-4 mt-2">
          {skills.map((skill) => (
            <div className="col-md-6 col-lg-4" key={skill.id || skill.name}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{skill.name || skill.title}</h5>
                  <p className="card-text text-secondary">{skill.description || 'No description available.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
