import React from 'react';

import { BugsContext, CommentsContext } from '../../context';

const MainContainer = () => {
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
                getCommentsByBug(bug.id);
              }}
            >
              <p>{bug.bugName}</p>
              <p>{bug.description}</p>
              <p>{bug.createdDate}</p>
              {comments &&
                comments.comments.map((comm) => (
                  <div key={comm.comment}>
                    <p>{comm.comment}</p>
                    <p>{comm.createdDate}</p>
                  </div>
                ))}
            </li>
          ));
        }
      })
    : null;

  // console.log({ MainContainer: { bugs, comments } });

  return (
    <main className="main-container">
      <ul className="bug-list">{renderBugs}</ul>
    </main>
  );
};

export default MainContainer;
