import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  BugsContainer,
  ToggleDev,
  CommentsPage,
  AddBugs,
  EditBugs
} from 'src/components';

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
          path="/dashboard/dev"
          render={(routeProps) => <ToggleDev {...routeProps} />}
        />
        <Route
          path="/dashboard/add"
          render={(routeProps) => <AddBugs {...routeProps} />}
        />
        <Route
          exact
          path="/dashboard/:bugId"
          render={(routeProps) => <CommentsPage {...routeProps} />}
        />
        <Route
          exact
          path="/dashboard/edit/:bugId"
          render={(routeProps) => <EditBugs {...routeProps} />}
        />

      </Switch>
    </>
  );
};

export default MainContainer;
