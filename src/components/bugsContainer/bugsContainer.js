import React, { useState } from 'react';
import BugsService from '../../services/bugs.service';
import { BugsContext, UserContext } from 'src/context';

const BugsContainer = ({ app }) => {
  const { userData } = React.useContext(UserContext);
  const { bugs } = React.useContext(BugsContext);

  console.log({ BugsContainer: { userData, bugs } });

  if (userData.dev === true) {
    return (
      <>
        <p>You are a Dev!</p>
      </>
    );
  } else {
    return (
      <>
        <p>BugsContainer</p>
      </>
    );
  }
};

export default BugsContainer;
