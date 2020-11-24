import React from 'react';

import { BugsContainer, CommentsContainer } from 'src/components';

import { BugsProvider, CommentsProvider } from 'src/context';
import BugsService from '../../services/bugs.service'

const DashboardRoute = () => {
  const [apps, setApps] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState(null)
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

  let makeButtons = apps.map((item, idx) => {
  return <button key={idx} value={item.app_name} onClick={(ev) => setSelectedApp(ev.currentTarget.value)}>{`${item.app_name}`}</button>
  })

  
  console.log({selectedApp})
  return (
    <>
      <p>Please select an app!</p>
      <div htmlFor='apps'>
        {makeButtons}
      </div>

      <BugsProvider apps={apps}>
        <CommentsProvider>
          <BugsContainer apps={apps} />
          <CommentsContainer />
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default DashboardRoute;
