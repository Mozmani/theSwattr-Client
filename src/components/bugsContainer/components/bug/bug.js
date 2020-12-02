import React from 'react';
import './bug.scss';

const Bug = ({ bug, history }) => {
  return (
    <li
      onClick={() => {
        history.push(`dashboard/${bug.id}`);
      }}
      className="bug-container"
    >
      <h3 className="bug-name">{bug.bugName}</h3>
      <hr className="bug-underline" />
      <p className="bug-description">{bug.description}</p>
      <div className="bug-info">
        <p className="bug-time">{bug.createdDate}</p>
        <p className="bug-status">Status: {bug.status}</p>
        <p className="bug-severity">Severity: {bug.severity}</p>
      </div>
    </li>
  );
};

export default Bug;
