import React from 'react';

import { FiltersContext } from 'src/context';

const FiltersContainer = () => {
  const Context = React.useContext(FiltersContext);
  console.log(Context);

  return (
    <>
      <p>FiltersContainer</p>
    </>
  );
};

export default FiltersContainer;
