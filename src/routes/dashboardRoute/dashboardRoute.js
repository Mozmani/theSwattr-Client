import React from 'react';

import { BugsService } from 'src/services';
import { BugsProvider, CommentsProvider } from 'src/context';
import { MainContainer } from 'src/components';

const DashboardRoute = ({ history }) => {
  const [apps, setApps] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState(null);
  const [, setError] = React.useState(null);

  React.useEffect(() => {
    const getApps = async () => {
      const appData = await BugsService.getAllApps();

      const formattedApps = [];
      const apps = appData.apps || [];
      for (let i = 0; i < apps.length; i++) {
        const str = apps[i].app_name;
        formattedApps.push(str.replace(' ', '-'));
      }

      if (!apps || !appData || 'error' in appData) {
        setError(appData.error);
      } else setApps(formattedApps);
    };

    getApps();
  }, []);

  const handleAppSelect = (ev) => {
    history.push('/dashboard');
    setSelectedApp(ev);
  };

  const makeButtons = apps.map((app) => {
    return (
      <button
        key={app}
        value={app}
        onClick={(ev) => handleAppSelect(ev.currentTarget.value)}
      >
        {app.replace('-', ' ')}
      </button>
    );
  });

  return (
    <>
      <p>Please select an app!</p>
      <div htmlFor="apps">{makeButtons}</div>

      <BugsProvider selectedApp={selectedApp} allApps={apps}>
        <CommentsProvider>
          <MainContainer app={selectedApp} />
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default DashboardRoute;
