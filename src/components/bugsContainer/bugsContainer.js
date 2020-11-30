import React from "react";
import { Link } from "react-router-dom";
import BugsService from '../../services/bugs.service'
import { BugsContext, UserContext } from "src/context";

const BugsContainer = ({ history }) => {
  const { bugs, selectedApp, userBugs } = React.useContext(BugsContext);
  let renderBugs;
  let userView;

  const { userData } = React.useContext(UserContext);
  if (userData.dev === true) {
    renderBugs = bugs
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
            : null
        )
      : null;
  } else {
    if (userBugs === null) {
      renderBugs = (
        <li>Hello, you have submitted no bugs yet! Please add one below.</li>
      );
      
    } else {
      renderBugs = userBugs ? userBugs.userBugs.map((bug) => {
        return <li
        key={bug.id}
        onClick={() => {
          history.push(`dashboard/${bug.id}`);
        }}
      >
        <p>{bug.bugName}</p>
        <p>{bug.description}</p>
        <p>{bug.createdDate}</p>
      </li>
      }) : null;
    }
    userView = (
      <button>
        <Link to="/dashboard/add">Add a bug!</Link>
      </button>
    );
  }

  const showHeader =
    selectedApp !== null ? <h3>{selectedApp.formatName}</h3> : null;
  //console.log(userData.userName)
  //console.log(userBugs);
  return (
    <main className="main-container">
      {showHeader}
      <ul className="bug-list">{renderBugs}</ul>
      {selectedApp !== null && (
        <button>
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      )}
      {userView}
    </main>
  );
};

export default BugsContainer;
