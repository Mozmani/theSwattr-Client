import React from 'react';
import { Link } from 'react-router-dom';

import './bugsContainer.scss';

import { BugsContext, UserContext } from 'src/context';
import { Bug, SeverityDiv } from './components';

const BugsContainer = ({ history }) => {
  const [showComplete, setShowComplete] = React.useState(false);

  const { bugs, selectedApp, userBugs } = React.useContext(
    BugsContext,
  );
  const { userData } = React.useContext(UserContext);

  const devBugs =
    bugs?.bugsPending &&
    Object.keys(bugs).map(
      (severity) =>
        severity !== 'bugsComplete' && (
          <SeverityDiv
            key={severity}
            bugs={bugs}
            severity={severity}
            history={history}
          />
        ),
    );

  const completeBugs = bugs?.bugsComplete && (
    <SeverityDiv
      key={'bugsComplete'}
      bugs={bugs}
      severity={'bugsComplete'}
      history={history}
    />
  );

  const nonDevBugs = !userBugs[0]?.message ? (
    userBugs.map((bug) => (
      <Bug key={bug.id} bug={bug} history={history} />
    ))
  ) : (
    <li>
      Hello, you have submitted no bugs yet! Please add one below.
    </li>
  );

  const renderBugs = userData?.dev ? devBugs : nonDevBugs;

  const userView = !devBugs ? (
    <button className="add-button">
      <Link to="/dashboard/add">Add a bug!</Link>
    </button>
  ) : null;

  const showHeader = selectedApp ? (
    <h3 className="welcome">{selectedApp.formatName}</h3>
  ) : null;

  const devButton = userData.dev && selectedApp && (
    <button
      className="toggle-completed-bugs"
      onClick={() => setShowComplete((prev) => !prev)}
    >
      {showComplete ? 'Hide Completed Bugs' : 'Show Completed Bugs'}
    </button>
  );

  return (
    <main className="main-container">
      {showHeader}
      {devButton}
      <ul className="bug-list">
        {showComplete ? completeBugs : renderBugs}
      </ul>
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
