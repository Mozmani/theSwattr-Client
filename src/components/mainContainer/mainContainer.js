import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './mainContainer.scss';

import { BugsService, TokenService } from 'src/services';
import {
  BugsProvider,
  CommentsProvider,
  UserContext,
} from 'src/context';
import {
  BugsContainer,
  ToggleDev,
  AddBugs,
  EditBugs,
  CommentsPage,
} from 'src/components';

const MainContainer = ({ history }) => {
  const [apps, setApps] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState(null);
  const [, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);

  React.useEffect(() => {
    const getApps = async () => {
      const appData = await BugsService.getAllApps();

      if (!appData || 'error' in appData) {
        console.error(appData);
        setError(appData.error);
      } else {
        let appName = window.localStorage.getItem('selectedApp');
        if (appName) {
          appName = appData.apps.find(
            (app) => app.rawName === appName,
          );
        } else appName = null;

        setApps(appData.apps);
        setSelectedApp(appName);
      }
    };

    if (!TokenService.hasAuthToken()) {
      history.push('/login');
    } else getApps();
  }, [history, userData]);

  const handleAppSelect = (app) => {
    window.localStorage.setItem('selectedApp', app.rawName);
    setSelectedApp(app);
    history.push('/dashboard');
  };

  const selectAppButtons = (
    <>
      <h3 className="welcome">Please select an app!</h3>
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => handleAppSelect(app)}
          className={`app-button ${app.rawName}-select`}
        >
          {app.formatName}
        </button>
      ))}
    </>
  );

  return (
    <>
   
      <BugsProvider selectedApp={selectedApp} allApps={apps}>
        <CommentsProvider>
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={(routeProps) => (
                <BugsContainer {...routeProps} 
                selectAppButtons={selectAppButtons}
                userData={userData}
                />
              )}
            />
            <Route
              path="/dashboard/dev"
              render={(routeProps) => <ToggleDev {...routeProps} 
              />}
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
              render={(routeProps) => (
                <CommentsPage {...routeProps} />
              )}
            />
          </Switch>{' '}
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default MainContainer;
