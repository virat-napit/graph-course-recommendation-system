import React from 'react';

export default function ErrorMessage({ message = "Failed to load data.", onRetry }) {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between my-4" role="alert">
      <div>
        <strong>Error:</strong> {message}
      </div>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

