import React from "react";
import { Link } from "react-router-dom";

import "./bugsContainer.scss";

import { BugsContext, UserContext } from "src/context";
import { Bug, SeverityDiv } from "./components";

//component to hold bugs view
const BugsContainer = (props) => {
  const [showComplete, setShowComplete] = React.useState(false);
  const history = props.history;

  const { bugs, selectedApp, userBugs } = React.useContext(BugsContext);
  //holds user data
  const { userData } = React.useContext(UserContext);

  // if user is a dev, grabs all bugs sorted by severity
  const devBugs =
    userData.dev && bugs.bugsPending
      ? Object.keys(bugs).map(
          (severity) =>
            severity !== "bugsComplete" && (
              <SeverityDiv
                key={severity}
                bugs={bugs}
                severity={severity}
                history={history}
              />
            )
        )
      : null;

  // renders completed bugs
  const completeBugs =
    userData.dev && bugs.bugsComplete ? (
      <SeverityDiv
        key={"bugsComplete"}
        bugs={bugs}
        severity={"bugsComplete"}
        history={history}
      />
    ) : null;

  //sets view from open bugs to closed bugs and contra.
  const devButton = userData.dev && selectedApp && (
    <button
      className="toggle-completed-bugs"
      onClick={() => setShowComplete((prev) => !prev)}
    >
      {showComplete ? "Hide Completed Bugs" : "Show Completed Bugs"}
    </button>
  );

  // renders user's bugs if available (non-devs)
  const nonDevBugs =
    !userData.dev && userBugs[0] && !userBugs[0].message ? (
      userBugs.map((bug) => <Bug key={bug.id} bug={bug} history={history} />)
    ) : (
      <li>Hello, you have submitted no bugs yet! Please add one below.</li>
    );

  // sets renderbugs based upon dev status
  const renderBugs = userData.dev ? devBugs : nonDevBugs;

  // renders add bug button for users
  const userView = !devBugs ? (
    <button className="add-button">
      <Link to="/dashboard/add">Add a bug!</Link>
    </button>
  ) : null;

  // shows which app is selected
  const showHeader = selectedApp ? (
    <h3 className="welcome">{selectedApp.formatName}</h3>
  ) : null;

  // renders button to toggle user dev status
  const toggleDevDiv = () => {
    return (
      <div className="dashboard-select-app-div">
        <button
          className="dev-button"
          onClick={() => history.push("/dashboard/dev")}
        >
          Toggle Dev
        </button>
        {props.userData.dev}
      </div>
    );
  };

  return (
    <main className="main-container">
      {toggleDevDiv()}

      {props.selectAppButtons}

      {showHeader}
      {devButton}
      <ul className="bug-list">{showComplete ? completeBugs : renderBugs}</ul>
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
