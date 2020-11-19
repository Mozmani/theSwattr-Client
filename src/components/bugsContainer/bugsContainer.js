import React from 'react';

import { BugsContext } from 'src/context';

const BugsContainer = () => {
  const Context = React.useContext(BugsContext);
  console.log(Context);

  return (
    <>
      <p>BugsContainer</p>
    </>
  );
};

export default BugsContainer;
