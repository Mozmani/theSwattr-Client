import React from 'react';

import { CommentsContext } from 'src/context';

const CommentsContainer = () => {
  const { comments } = React.useContext(CommentsContext);
  console.log({ CommentsContainer: comments });

  return (
    <>
      <p>CommentsContainer</p>
    </>
  );
};

export default CommentsContainer;
