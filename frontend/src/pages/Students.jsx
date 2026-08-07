import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../services/studentService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let mounted = true;

    getAllStudents()
      .then((res) => {
        if (mounted) {
          setStudents(res.data || []);
          setNotice(res.fromFallback ? 'Backend unavailable. Showing demo student data.' : null);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Failed to load students.');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 text-primary">Students</h2>
          <p className="text-muted mb-0">Manage student profiles and browse available records.</p>
        </div>
      </div>

      {loading && <Loading message="Loading students..." />}
      {error && <ErrorMessage message={error} />}
      {notice && (
        <div className="alert alert-warning" role="alert">
          {notice}
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <EmptyState
          title="No Students Found"
          description="There are no students available yet."
        />
      )}

      {!loading && !error && students.length > 0 && (
        <div className="row g-4">
          {students.map((student) => (
            <div className="col-md-6 col-lg-4" key={student.id || student.studentId}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{student.name || 'Unnamed Student'}</h5>
                  <p className="card-text text-muted mb-2">{student.email || 'No email provided'}</p>
                  <p className="card-text small text-secondary">
                    {student.department || 'Department not provided'}
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
