import React from 'react';

import { BugsService } from 'src/services';
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
      } else setApps(appData.apps);
    };

    getApps();
  }, []);

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    history.push('/dashboard');
  };

  const selectAppButtons = apps.map((app) => (
    <button
      key={app.id}
      onClick={() => handleAppSelect(app)}
      className={`${app.rawName}-dashboard-select-app`}
      id="app-button"
    >
      {app.formatName}
    </button>
  ));

  if (userData.dev === true) {
    return (
      <>
        <div className="dashboard-select-app-div">
          <button
            className="dev-button"
            onClick={() => history.push('/dashboard/dev')}
          >
            Toggle Dev
          </button>
          <h3 className="welcome">Please select an app!</h3>
          {selectAppButtons}
        </div>
        <BugsProvider selectedApp={selectedApp} allApps={apps}>
          <CommentsProvider>
            <MainContainer />
          </CommentsProvider>
        </BugsProvider>
      </>
    );
  } else {
    return (
      <>
        <div className="dashboard-select-app-div">
          <button
            className="dev-button"
            onClick={() => history.push('/dashboard/dev')}
          >
            Toggle Dev
          </button>
        </div>
        <BugsProvider selectedApp={selectedApp} allApps={apps}>
          <CommentsProvider>
            <MainContainer />
          </CommentsProvider>
        </BugsProvider>
      </>
    );
  }
};

export default DashboardRoute;
