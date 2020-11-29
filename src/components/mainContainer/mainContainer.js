import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { BugsContainer, CommentsPage, AddBugs } from 'src/components';

const MainContainer = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard"
          render={(routeProps) => <BugsContainer {...routeProps} />}
        />
        <Route
          path="/dashboard/add"
          render={(routeProps) => <AddBugs {...routeProps} />}
        />
        <Route
          path="/dashboard/bug/:bugId"
          render={(routeProps) => <CommentsPage {...routeProps} />}
        />
      </Switch>
    </>
  );
};

export default MainContainer;
