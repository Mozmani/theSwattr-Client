import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  BugsContainer,
  ToggleDev,
  AddBugs,
  EditBugs,
  CommentsPage,
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
          path="/dashboard/edit/:bugId"
          render={(routeProps) => <EditBugs {...routeProps} />}
        />
        <Route
          path="/dashboard/:bugId"
          render={(routeProps) => <CommentsPage {...routeProps} />}
        />
      </Switch>
    </>
  );
};

export default MainContainer;
