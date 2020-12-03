import React from 'react';

import './editBugs.scss';

import { EditBugFields } from 'src/helpers/formFields';
import { BugsService } from 'src/services';
import { BugsContext } from 'src/context';
import useFormState from 'src/hooks/useFormState';

const EditBugs = ({ match, history }) => {
  const [currentBug, setCurrentBug] = React.useState(null);
  const [options, setOptions] = React.useState(null);

  const { allApps, updateBugs } = React.useContext(BugsContext);

  const { formFields, setFormFields, handleOnChange } = useFormState({
    severity: '',
    status: '',
    appName: '',
    description: '',
    completedNotes: '',
  });

  React.useEffect(() => {
    const drawCurrentBug = async () => {
      const bug = await BugsService.getBugById(match.params.bugId);
      const severity = await BugsService.getAllSeverity();
      const status = await BugsService.getAllStatus();

      setFormFields({
        severity: bug.severity,
        status: bug.status,
        appName: bug.app,
        description: bug.description,
        completedNotes: bug.completedNotes || '',
      });

      setCurrentBug(bug);
      setOptions({ severity, status, allApps });
    };

    if (!currentBug) {
      drawCurrentBug();
    }
  }, [currentBug, match.params.bugId, setFormFields, allApps]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const newBug = {
      severity: formFields.severity,
      status: formFields.status,
      app: formFields.appName,
      description: formFields.description,
      user_name: currentBug.bugPostedBy,
      bug_name: currentBug.bugName,
    };

    const notes = formFields.completedNotes;
    if (notes) {
      if (newBug.status !== 'closed') {
        console.error({ error: 'status must be closed' });
        return;
      } else newBug.completedNotes = notes;
    }

    await BugsService.editBug(newBug, currentBug.id);
    await updateBugs(newBug.app);
    history.goBack();
  };

  const renderCurrentBug = currentBug && (
    <div>
      <h3 className="welcome">Current Bug Details:</h3>
      <ul className="detail-list">
        <li className="current-item" key={currentBug.id}>
          <p className="detail">App Name: {currentBug.app}</p>
          <p className="detail">Bug Name: {currentBug.bugName}</p>
          <p className="detail">
            Posted By: {currentBug.bugPostedBy}
          </p>
          <p className="detail">
            Description: {currentBug.description}
          </p>
          <p className="detail">Severity: {currentBug.severity}</p>
          <p className="detail">Bug Status: {currentBug.status}</p>
          <p className="detail">
            Completed: {currentBug.completedNotes || `False`}
          </p>
        </li>
      </ul>
    </div>
  );

  const renderFormFields =
    options &&
    EditBugFields.getInputFields(
      options,
      currentBug,
      formFields,
      handleOnChange,
    );

  return (
    <>
      <p className="welcome">{`Bug Id: ${match.params.bugId}`}</p>
      <div>{renderCurrentBug}</div>
      <h3 className="welcome">Edit Bug details:</h3>
      <form className="edit-bug-form" onSubmit={handleSubmit}>
        {renderFormFields}
        <footer className="form-footer">
          <button className="edit-submit-button">Update Bug!</button>
        </footer>
      </form>
    </>
  );
};

export default EditBugs;
