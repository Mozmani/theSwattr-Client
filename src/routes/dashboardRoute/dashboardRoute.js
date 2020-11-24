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

      

      let newArr =[]
      let arr = appData.apps
      for (let i=0; i < arr.length; i++){
        const str = arr[i].app_name
        //console.log('str is', str.replace(' ', '-'))
        newArr.push(str.replace(' ', '-'))
      }    

      //console.log('apps', newArr)
      if (!appData || 'error' in appData) {
        //console.error(appData.error);
        setError(appData.error);
      } else setApps(newArr);
    };

    getApps();
  }, []);

  //console.log({apps})
  const makeButtons = apps.map((app) => {
    return (
      <button
        key={app}
        value={app}
        onClick={(ev) => setSelectedApp(ev.currentTarget.value)}
      >
        {app.replace('-', ' ')}
      </button>
    );
  });

  return (
    <>
      <p>Please select an app!</p>
      <div htmlFor="apps">{makeButtons}</div>

      <BugsProvider app={selectedApp}>
        <CommentsProvider>
          <MainContainer />
        </CommentsProvider>
      </BugsProvider>
    </>
  );
};

export default DashboardRoute;
