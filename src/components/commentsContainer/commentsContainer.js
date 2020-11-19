import React from 'react';

import { CommentsContext } from 'src/context';

const CommentsContainer = () => {
  const Context = React.useContext(CommentsContext);
  console.log(Context);

  return (
    <>
      <p>CommentsContainer</p>
    </>
  );
};

export default CommentsContainer;
