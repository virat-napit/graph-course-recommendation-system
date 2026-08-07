import React from 'react';

export default function EmptyState({ title = "No Data Found", description = "There are no records to display." }) {
  return (
    <div className="text-center my-5 p-5 bg-light rounded border">
      <h4 className="text-secondary">{title}</h4>
      <p className="text-muted">{description}</p>
    </div>
  );
}
