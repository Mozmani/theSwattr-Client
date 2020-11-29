import React, { useState } from 'react';

import { BugsService } from 'src/services';
import { BugsContext, UserContext } from 'src/context';

const AddBugs = ({ history }) => {
  const [bugName, setBugName] = useState(null);
  const [description, setDesc] = useState(null);
  const [theApp, setApp] = useState(null);

  const { userData } = React.useContext(UserContext);
  const { allApps } = React.useContext(BugsContext);

  const postBug = async () => {
    let newBug = {
      user_name: userData.userName,
      bug_name: bugName,
      description: description,
      app: theApp,
    };

    await BugsService.postNewBug(newBug);
    history.push('/dashboard');
  };

  console.log(theApp);

  const chooseApp = allApps
    ? allApps.map((item) => {
        return (
          <option key={item.id} value={item.app_name}>
            {item.app_name}
          </option>
        );
      })
    : null;

  return (
    <div>
      <h3>Add your bug here!</h3>
      <form className="newBug">
        <select
          onChange={(ev) => {
            setApp(ev.currentTarget.value);
          }}
        >
          {chooseApp}
        </select>
        <label htmlFor="bugName">What is the bug?</label>
        <input
          id="bugName"
          onChange={(ev) => {
            setBugName(ev.currentTarget.value);
          }}
        ></input>
        <label htmlFor="bugDescription">
          Please describe the bug in detail
        </label>
        <textarea
          id="bugDescription"
          onChange={(ev) => {
            setDesc(ev.currentTarget.value);
          }}
        ></textarea>
        <button
          type="button"
          onClick={() => {
            postBug();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBugs;
