import React from 'react';

import {
  FiltersContainer,
  BugsContainer,
  CommentsContainer,
} from 'src/components';

import {
  FiltersProvider,
  BugsProvider,
  CommentsProvider,
} from 'src/context';

const DashboardRoute = () => {
  return (
    <>
      <p>Here is Dashboard</p>
      <FiltersProvider>
        <FiltersContainer />
      </FiltersProvider>

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
