import React from 'react';
import { Link } from 'react-router-dom';

import './bugsContainer.scss';

import { BugsService } from 'src/services';
import { BugsContext, UserContext } from 'src/context';

const BugsContainer = ({ history }) => {
  const { bugs, selectedApp, userBugs } = React.useContext(
    BugsContext,
  );
  const { userData } = React.useContext(UserContext);

  let renderBugs;
  let userView;
  if (userData.dev === true) {
    renderBugs = bugs.bugsPending
      ? Object.keys(bugs).map((severity) =>
          bugs[severity].length
            ? bugs[severity].map((bug) => (
                <li
                  className="bug-container"
                  key={bug.id}
                  onClick={() => {
                    history.push(`dashboard/${bug.id}`);
                  }}
                >
                  <h3 className="bug-name">{bug.bugName}</h3>
                  <hr className="bug-underline" />
                  <p className="bug-description">{bug.description}</p>
                  <div className="bug-info">
                    <p className="bug-time">{bug.createdDate}</p>
                    <p className="bug-severity">{`Severity: ${bug.severity}`}</p>
                  </div>
                </li>
              ))
            : null,
        )
      : null;
  } else {
    if (!userBugs[0]) {
      renderBugs = (
        <li>
          Hello, you have submitted no bugs yet! Please add one below.
        </li>
      );
    } else {
      renderBugs = userBugs.map((bug) => {
        return (
          <li
            className="bug-container"
            key={bug.id}
            onClick={() => {
              history.push(`dashboard/${bug.id}`);
            }}
          >
            <h3 className="bug-name">{bug.bugName}</h3>
            <hr className="bug-underline" />
            <p className="bug-description">{bug.description}</p>
            <div className="bug-info">
              <p className="bug-time">{bug.createdDate}</p>
            </div>
          </li>
        );
      });
    }
    userView = (
      <button className="add-button">
        <Link to="/dashboard/add">Add a bug!</Link>
      </button>
    );
  }

  const showHeader =
    selectedApp !== null ? <h3>{selectedApp.formatName}</h3> : null;

  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {selectedApp !== null && (
        <button className="add-button">
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      )}
      {userView}
    </main>
  );
};

export default BugsContainer;
