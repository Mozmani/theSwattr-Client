import React from 'react';

import { BugsContainer, CommentsContainer } from 'src/components';

import { BugsProvider, CommentsProvider } from 'src/context';

const DashboardRoute = () => {
  // const Context = React.useContext(UserContext);

  return (
    <>
      <p>Here is Dashboard</p>

      <BugsProvider>
        <BugsContainer />
      </BugsProvider>

      <CommentsProvider>
        <CommentsContainer />
      </CommentsProvider>
    </>
  );
};

export default DashboardRoute;
