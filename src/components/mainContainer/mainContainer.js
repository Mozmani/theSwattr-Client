import React from 'react';

import { BugsContext, CommentsContext } from '../../context';


const MainContainer = () => {
  const { bugs } = React.useContext(BugsContext);
  const { comments } = React.useContext(CommentsContext);

  console.log('hi')

  return (<div className="main-container"></div>);
};

export default MainContainer;
