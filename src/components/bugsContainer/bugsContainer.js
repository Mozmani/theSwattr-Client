import React from 'react';

import { BugsContext, CommentsContext } from 'src/context';

const BugsContainer = ({ history, addBugs, app }) => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  const renderBugs = bugs
    ? Object.keys(bugs).map((severity) => {
        if (bugs[severity].length) {
          return bugs[severity].map((bug) => (
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
          ));
        }
        return null;
      })
    : null;

  const showHeader = app ? <h3>{app}</h3> : null;

  const newBugForm = () => <form className="newBug"></form>;

  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {addBugs()}
    </main>
  );
};

export default BugsContainer;
