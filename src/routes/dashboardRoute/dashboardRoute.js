import React from 'react';

import { BugsService, TokenService } from 'src/services';
import {
  BugsProvider,
  CommentsProvider,
  UserContext,
} from 'src/context';
import { MainContainer } from 'src/components';
import './dashboardRoute.scss';

const DashboardRoute = ({ history }) => {
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
        setApps(appData.apps);
        setSelectedApp(appData.apps[0]);
      }
    };

    if (!TokenService.hasAuthToken()) {
      history.push('/login');
    } else getApps();
  }, [history, userData.userName]);

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    history.push('/dashboard');
  };

  const selectAppButtons = apps.map((app) => (
    <button
      key={app.id}
      onClick={() => handleAppSelect(app)}
      className={`app-button ${app.rawName}-select`}
    >
      {app.formatName}
    </button>
  ));

  const devView = (
    <>
      <h3 className="welcome">Please select an app!</h3>
      {selectAppButtons}
    </>
  );

  return (
    <>
      <div className="dashboard-select-app-div">
        <button
          className="dev-button"
          onClick={() => history.push('/dashboard/dev')}
        >
          Toggle Dev
        </button>
        {userData.dev && devView}
      </div>
      <BugsProvider selectedApp={selectedApp} allApps={apps}>
        <CommentsProvider>
          <MainContainer />
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default DashboardRoute;
