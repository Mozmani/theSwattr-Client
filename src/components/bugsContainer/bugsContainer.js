import React from 'react';

import { BugsService } from 'src/services';
import { BugsContext, CommentsContext } from 'src/context';

const BugsContainer = ({ app, addBugsButton, history }) => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  // console.log(props)
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
      })
    : null;

  const showHeader = () => {
    if (app !== null) {
      return <h3>{app}</h3>;
    } else {
      return <></>;
    }
  };

  const newBugForm = () => {
    return <form className="newBug"></form>;
  };

  //console.log({ MainContainer: { bugs, comments } });
  //console.log(app)
  return (
    <main className="main-container">
      {showHeader()}
      <ul className="bug-list">{renderBugs}</ul>
      {addBugsButton()}
    </main>
  );
};

export default BugsContainer;
