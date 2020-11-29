import React from 'react';
import { Link } from 'react-router-dom';

import { BugsContext } from 'src/context';

const BugsContainer = ({ history }) => {
  const { bugs, selectedApp } = React.useContext(BugsContext);

  const renderBugs = bugs
    ? Object.keys(bugs).map((severity) =>
        bugs[severity].length
          ? bugs[severity].map((bug) => (
              <li
                key={bug.bugName}
                onClick={() => {
                  history.push(`dashboard/${bug.id}`);
                }}
              >
                <p>{bug.bugName}</p>
                <p>{`Severity: ${bug.severity}`}</p>
                <p>{bug.description}</p>
                <p>{bug.createdDate}</p>
              </li>
            ))
          : null,
      )
    : null;

  const showHeader =
    selectedApp !== null ? <h3>{selectedApp.formatName}</h3> : null;

  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {selectedApp !== null && (
        <button>
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      )}
    </main>
  );
};

export default BugsContainer;
