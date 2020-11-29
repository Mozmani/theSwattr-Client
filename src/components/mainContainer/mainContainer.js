import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { BugsContext, CommentsContext } from 'src/context';
import { BugsContainer, CommentsPage, AddBugs } from 'src/components';

const MainContainer = ({ app, history }) => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  const addBugsButton = () => {
    if (app !== null) {
      return (
        <button>
          <Link to="/dashboard/add">Add a bug!</Link>
        </button>
      );
    } else {
      return;
    }
  };

  /*
  <Route
  path='/dashboard'
  render={(props) => (
    <BugsContainer {...props} addBugsButton={addBugsButton} />
  )}
/>
  */

  // ! note, Switch will only render 1 component at a time
  // ! second, we're inside PrivateRoute, so no need for it here
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard/bug/:bugId"
          component={CommentsPage}
        />
        <Route exact path="/dashboard/add" component={AddBugs} />
        <Route
          path="/dashboard"
          render={(props) => (
            <BugsContainer {...props} addBugsButton={addBugsButton} />
          )}
        />
      </Switch>
    </>
  );
};

export default MainContainer;
