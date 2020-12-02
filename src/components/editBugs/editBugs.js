import React from 'react';

import './editBugs.scss';

import { EditBugFields } from 'src/helpers/formFields';
import { BugsService } from 'src/services';
import { BugsContext } from 'src/context';

const EditBugs = ({ match, history }) => {
  const [currentBug, setCurrentBug] = React.useState(null);
  const [severity, setSeverity] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const { allApps, updateBugs } = React.useContext(BugsContext);

  let theCurrent;

  const drawCurrentBug = async () => {
    const bug = await BugsService.getBugById(match.params.bugId);
    const severityData = await BugsService.getAllSeverity();
    const statusData = await BugsService.getAllStatus();

    setCurrentBug(bug);
    setSeverity(severityData);
    setStatus(statusData);
  };

  if (currentBug === null) {
    drawCurrentBug();
  }

  if (currentBug !== null) {
    theCurrent = (
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
  }

  const drawSeverity = severity
    ? severity.map((severity) => {
        return (
          <option key={severity} value={severity}>
            {severity}
          </option>
        );
      })
    : null;

  const drawStatus = status
    ? status.map((status) => {
        return (
          <option key={status} value={status}>
            {status}
          </option>
        );
      })
    : null;

  const drawApps = allApps
    ? allApps.map((app) => {
        return (
          <option key={app.formatName} value={app.rawName}>
            {app.formatName}
          </option>
        );
      })
    : null;

  const showDescription = currentBug ? (
    <label htmlFor="description">
      Description:
      <textarea
        name="description"
        id="description"
        defaultValue={currentBug.description}
      ></textarea>
    </label>
  ) : null;

  let formRender;
  if (severity && status) {
    formRender = EditBugFields.getInputFields(
      { severity, status, allApps },
      currentBug,
    );
  }

  const submitEditedBug = async (ev) => {
    ev.preventDefault();

    const {
      severity,
      status,
      appName,
      description,
      completedNotes,
    } = ev.target;
    //console.log(description.value)
    const newBug = {
      status: status.value,
      app: appName.value,
      severity: severity.value,
      user_name: currentBug.bugPostedBy,
      bug_name: currentBug.bugName,
      description: description.value,
      completed_notes: completedNotes.value
        ? completedNotes.value
        : null,
    };
    //console.log(newBug)
    await BugsService.editBug(newBug, currentBug.id);
    await updateBugs(newBug.app);
    history.push('/dashboard');
  };

  //console.log(currentBug);
  return (
    <>
      <p className="welcome">{`Bug Id: ${match.params.bugId}`}</p>
      <div>{theCurrent}</div>
      <h3 className="welcome">Edit Bug details:</h3>
      <form className="edit-bug-form" onSubmit={submitEditedBug}>
        {formRender}
        {/* <label htmlFor="severity">
          Severity:
          <select className="selector" id="severity" name="severity">
            {drawSeverity}
          </select>
        </label>
        <label htmlFor="status">
          Status:
          <select className="selector" id="status" name="status">
            {drawStatus}
          </select>
        </label>
        <label htmlFor="appName">
          App Name:
          <select className="selector" id="appName" name="appName">
            {drawApps}
          </select>
        </label>
        {showDescription}
        <label htmlFor="completedNotes">
          Completed Notes:
          <textarea
            id="completedNotes"
            placeholder="Only enter this if you are closing the bug!"
            name="completedNotes"
          ></textarea>
        </label> */}
        <footer className="form-footer">
          <button className="edit-submit-button">Update Bug!</button>
        </footer>
      </form>
    </>
  );
};

export default EditBugs;
