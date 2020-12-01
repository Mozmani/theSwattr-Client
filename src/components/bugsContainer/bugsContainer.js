import React from 'react';
import { Link } from 'react-router-dom';

import './bugsContainer.scss';

import { BugsContext, UserContext } from 'src/context';
import { Bug, SeverityDiv } from './components';

const BugsContainer = ({ history }) => {
  const { bugs, selectedApp, userBugs } = React.useContext(
    BugsContext,
  );
  const { userData } = React.useContext(UserContext);

  const devBugs =
    userData.dev && bugs.bugsPending
      ? Object.keys(bugs).map(
          (severity) =>
            severity !== 'bugsComplete' && (
              <SeverityDiv
                key={severity}
                bugs={bugs}
                severity={severity}
                history={history}
              />
            ),
        )
      : null;

  const nonDevBugs =
    !userData.dev && userBugs && userBugs.length ? (
      userBugs.map((bug) => (
        <Bug key={bug.id} bug={bug} history={history} />
      ))
    ) : (
      <li>
        Hello, you have submitted no bugs yet! Please add one below.
      </li>
    );

  const renderBugs = userData.dev ? devBugs : nonDevBugs;

  const userView = !devBugs ? (
    <button className="add-button">
      <Link to="/dashboard/add">Add a bug!</Link>
    </button>
  ) : null;

  const showHeader = selectedApp ? (
    <h3 className="welcome">{selectedApp.formatName}</h3>
  ) : null;

  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {selectedApp && (
        <button className="add-button">
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      )}
      {userView}
    </main>
  );
};

export default BugsContainer;
