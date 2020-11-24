import React from 'react';

import { BugsContainer, CommentsContainer } from 'src/components';

import { BugsProvider, CommentsProvider } from 'src/context';

const DashboardRoute = () => {
  const [apps, setApps] = React.useState(null);

  React.useEffect(() => {
    // const getApps = async () => {
    //   const appData = await CommentsService.getAllComments();

    //   if (!commData || 'error' in commData) {
    //     console.error(commData.error);
    //     setError(commData.error);
    //   } else setApps(appData);
    // };

    getApps();
  }, []);

  return (
    <>
      <p>Here is Dashboard</p>

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
