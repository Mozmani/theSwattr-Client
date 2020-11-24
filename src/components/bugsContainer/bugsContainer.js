import React, { useState } from 'react';
import BugsService from '../../services/bugs.service';
import { BugsContext, UserContext } from 'src/context';

const BugsContainer = () => {
  const Context = React.useContext(BugsContext);
  const { userData } = React.useContext(UserContext);
  console.log('here is context', Context);

  let [app, setApp] = useState({});
  let [bugs, setBugs] = useState({});

  if (userData.dev === true) {
    if (app.length < 1) {
      const appData = BugsService.getAllApps();
      setApp(appData);
      console.log('hmmm', appData);
    }

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
