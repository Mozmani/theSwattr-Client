import React from 'react';

import { BugsService } from 'src/services';
import { BugsContext, UserContext } from 'src/context';
import useFormState from 'src/hooks/useFormState';

const AddBugs = ({ history }) => {
  const [, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);
  const { allApps, addNewBug } = React.useContext(BugsContext);

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

    await addNewBug(res.newBug);
    history.push('/dashboard');
  };

  const fields = ['bug_name', 'description'];

  const formAttr = {
    bug_name: {
      displayText: 'Bug Name',
      inputType: 'text',
      labelClass: 'bug-name-add-bug-label',
      inputClass: 'bug-name-add-bug-input',
    },
    description: {
      displayText: 'Description',
      inputType: '',
      labelClass: 'description-add-bug-label',
      inputClass: 'description-add-bug-input',
    },
  };

  const inputFields = fields.map((field) => {
    const inputAttrs = {
      required: true,
      id: field,
      type: formAttr[field].inputType,
      value: formFields[field],
      onChange: handleOnChange(field),
      className: formAttr[field].inputClass,
    };

    return (
      <label
        key={field}
        htmlFor={field}
        className={formAttr[field].labelClass}
      >
        {formAttr[field].displayText}
        {field === 'description' ? (
          <textarea {...inputAttrs} />
        ) : (
          <input {...inputAttrs} />
        )}
      </label>
    );
  });

  const appOptions = allApps.map((app) => {
    return (
      <option key={app.id} value={app.rawName}>
        {app.formatName}
      </option>
    );
  });

  return (
    <div className="add-bug-container">
      <h3>Add your bug here!</h3>
      <form className="add-bug-form" onSubmit={handleSubmit}>
        <select onChange={handleOnChange('app')}>{appOptions}</select>
        {inputFields}
        <footer>
          <button type="submit" className="add-bug-submit">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AddBugs;
