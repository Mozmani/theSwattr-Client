import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { BugsContainer, CommentsPage, AddBugs } from 'src/components';

const MainContainer = ({ selectedApp }) => {
  const addBugsButton = () => {
    if (selectedApp !== null) {
      return (
        <button>
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      );
    } else {
      return;
    }
  };

  // ! note, Switch will only render 1 component at a time
  // ! second, we're inside PrivateRoute, so no need for it here
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard"
          render={(routeProps) => (
            <BugsContainer
              selectedApp={selectedApp}
              addBugsButton={addBugsButton}
              {...routeProps}
            />
          )}
        />
        <Route
          path="/dashboard/add"
          render={(routeProps) => <AddBugs {...routeProps} />}
        />
        <Route
          path="/dashboard/bug/:bugId"
          component={CommentsPage}
          render={(routeProps) => <CommentsPage {...routeProps} />}
        />
      </Switch>
    </>
  );
};

export default MainContainer;
