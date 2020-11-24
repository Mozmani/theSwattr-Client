import React from 'react';

import { MainContainer } from 'src/components';

import { BugsProvider, CommentsProvider } from 'src/context';
import BugsService from '../../services/bugs.service';

const DashboardRoute = () => {
  const [apps, setApps] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getApps = async () => {
      const appData = await BugsService.getAllApps();

      if (!appData || 'error' in appData) {
        console.error(appData.error);
        setError(appData.error);
      } else setApps(appData.apps);
    };

    getApps();
  }, []);

  const makeButtons = apps.map((app) => {
    return (
      <button
        key={app.app_name}
        value={app.app_name}
        onClick={(ev) => setSelectedApp(ev.currentTarget.value)}
      >
        {app.app_name}
      </button>
    );
  });

  return (
    <>
      <p>Please select an app!</p>
      <div htmlFor="apps">{makeButtons}</div>

      <BugsProvider apps={apps}>
        <CommentsProvider>
          <MainContainer />
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default DashboardRoute;
