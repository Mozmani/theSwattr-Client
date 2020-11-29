import React from 'react';

import { BugsContext } from 'src/context';

const BugsContainer = ({ selectedApp, addBugsButton, history }) => {
  const { bugs } = React.useContext(BugsContext);

  const renderBugs = bugs
    ? Object.keys(bugs).map((severity) =>
        bugs[severity].length
          ? bugs[severity].map((bug) => (
              <li
                key={bug.bugName}
                onClick={() => {
                  history.push(`dashboard/bug/${bug.id}`);
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
    selectedApp !== null ? <h3>{selectedApp}</h3> : null;

  // const newBugForm = <form className="newBug"></form>;

  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {addBugsButton()}
    </main>
  );
};

export default BugsContainer;
