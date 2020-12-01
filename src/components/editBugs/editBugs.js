import React from 'react';

import { BugsService } from 'src/services';
import { BugsContext } from 'src/context';

const EditBugs = ({ match, history }) => {
  let [currentBug, setBug] = React.useState(null);
  let [severity, setSeverity] = React.useState(null);
  let [status, setStatus] = React.useState(null);

  const { allApps } = React.useContext(BugsContext);

  let theCurrent;

  const drawCurrentBug = async () => {
    const bugData = await BugsService.getBugById(match.params.bugId);
    const severityData = await BugsService.getAllSeverity();
    const statusData = await BugsService.getAllStatus();

    setBug(bugData);
    setSeverity(severityData);
    setStatus(statusData);
  };

  if (currentBug === null) {
    drawCurrentBug();
  }

  if (currentBug !== null) {
    theCurrent = (
      <div>
        <h3>Current Bug Details:</h3>
        <ul>
          <li key={currentBug.id}>
            <p>{`App Name: ${currentBug.app}`}</p>
            <p>{`Bug Name: ${currentBug.bugName}`}</p>
            <p>{`Bug Posted By: ${currentBug.bugPostedBy}`}</p>
            <p>{`Bug Description: ${currentBug.description}`}</p>
            <p>{`Bug Severity: ${currentBug.severity}`}</p>
            <p>{`Bug Status: ${currentBug.status}`}</p>
            <p>{`Bug Completed Notes: ${currentBug.completedNotes}`}</p>
          </li>
        </ul>
      </div>
    );
  }

  const drawSeverities = severity
    ? severity.map((sev) => {
        return (
          <option key={sev} value={sev}>
            {sev}
          </option>
        );
      })
    : null;

  const drawstatus = status
    ? status.map((sev) => {
        return (
          <option key={sev} value={sev}>
            {sev}
          </option>
        );
      })
    : null;

  const drawApps = allApps
    ? allApps.map((sev) => {
        return (
          <option key={sev.formatName} value={sev.rawName}>
            {sev.formatName}
          </option>
        );
      })
    : null;

  const showDescription = currentBug ? (
    <div>
      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        id="description"
        defaultValue={currentBug.description}
      ></textarea>
    </div>
  ) : null;

  const submitEditedBug = async (ev) => {
    ev.preventDefault();

    const {
      description,
      severity,
      status,
      appName,
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
    history.push('/dashboard');
  };

  //console.log(currentBug);
  return (
    <>
      <p>{`Bug Id: ${match.params.bugId}`}</p>
      <div>{theCurrent}</div>
      <h3>Edit Bug details:</h3>
      <form onSubmit={submitEditedBug}>
        <label htmlFor="severity">Severity:</label>
        <select id="severity" name="severity">
          {drawSeverities}
        </select>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status">
          {drawstatus}
        </select>
        <label htmlFor="appName">App Name:</label>
        <select id="appName" name="appName">
          {drawApps}
        </select>
        {showDescription}
        <label htmlFor="completedNotes">Completed Notes:</label>
        <textarea
          id="completedNotes"
          placeholder="Only enter this if you are closing the bug!"
          name="completedNotes"
        ></textarea>
        <button>Submit Bug Edit!</button>
      </form>
    </>
  );
};

export default EditBugs;
