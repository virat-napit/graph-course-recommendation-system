import React from 'react';

export default function Loading({ message = "Loading data..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">{message}</p>
    </div>
  );
}

