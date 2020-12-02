import React from 'react';

import './addBugs.scss';

import { AddBugFields } from 'src/helpers/formFields';
import { BugsService } from 'src/services';
import { BugsContext, UserContext } from 'src/context';
import useFormState from 'src/hooks/useFormState';

const AddBugs = ({ history }) => {
  const [, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);
  const { allApps, addNewBug, addNewUserBug } = React.useContext(
    BugsContext,
  );

  const { formFields, handleOnChange } = useFormState({
    app: 'main-app',
    bug_name: '',
    description: '',
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    formFields.user_name = userData.userName;
    const res = await BugsService.postNewBug(formFields);

    if (res.error || res.message) {
      console.error(res);
      setError(res.error || res.message);
      return;
    }

    if (userData.dev === true) {
      await addNewBug(res.newBug);
    } else {
      await addNewUserBug(res.newBug);
    }

    history.goBack();
  };

  const inputFields = AddBugFields.getInputFields(
    formFields,
    handleOnChange,
  );

  const appOptions = allApps.map((app) => {
    return (
      <option key={app.id} value={app.rawName}>
        {app.formatName}
      </option>
    );
  });

  return (
    <div className="add-bug-container">
      <button
        onClick={() => history.goBack()}
        className="go-back-button"
      >
        Back to Bugs
      </button>
      <h3 className="welcome">Add your bug here!</h3>
      <form className="add-bug-form" onSubmit={handleSubmit}>
        <select
          className="app-selector"
          onChange={handleOnChange('app')}
        >
          {appOptions}
        </select>
        {inputFields}
        <footer className="form-footer">
          <button type="submit" className="add-bug-submit">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AddBugs;
