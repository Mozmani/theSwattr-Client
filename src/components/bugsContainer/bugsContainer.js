import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import BugsService from '../../services/bugs.service';
import { BugsContext, UserContext, CommentsContext } from 'src/context';

const BugsContainer = (props) => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  console.log(props)
  const renderBugs = bugs
    ? Object.keys(bugs).map((severity) => {
        if (bugs[severity].length) {
          return bugs[severity].map((bug) => (
            <li
              key={bug.bugName}
              onClick={() => {props.history.push(`dashboard/bug/${bug.id}`)}}
            >
              <p>{bug.bugName}</p>
              <p>{bug.description}</p>
              <p>{bug.createdDate}</p>
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

export default BugsContainer;
