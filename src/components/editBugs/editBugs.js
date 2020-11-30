import React from "react";
import BugsService from "../../services/bugs.service";

const EditBugs = ({ match }) => {
  let [currentBug, setBug] = React.useState(null)
  let [apps, setApps] = React.useState(null)
  let [severity, setSeverity] = React.useState(null)
  let [status, setStatus] = React.useState(null)


  let theCurrent;


  const drawCurrentBug = async () => {
    const bugData = await BugsService.getBugById(match.params.bugId);
    setBug(bugData)

    const appData = await BugsService.getAllApps();
    setApps(appData)
    const severityData = await BugsService.getAllSeverity();
    setSeverity(severityData)
    const statusData = await BugsService.getAllStatus();
    setStatus(statusData)

    //console.log(appData.apps, severityData, statusData);
  };

  if(currentBug === null){
    drawCurrentBug()
    
  }

  if(currentBug !== null){
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

  const drawSeverities = severity ? 
    severity.map((sev) => {
    return (<option key={sev} value={sev}>{sev}</option>)
    })
  : null

  const drawstatus = status ? 
  status.map(sev => {
  return (<option key={sev} value={sev}>{sev}</option>)
  })
: null

const drawApps = apps ? 
apps.apps.map(sev => {
return (<option key={sev.formatName} value={sev.rawName}>{sev.formatName}</option>)
})
: null

  //console.log(currentBug);
  return (
    <>
      <p>{`Bug Id: ${match.params.bugId}`}</p>
      <div>{theCurrent}</div>
      <h3>Edit Bug details:</h3>
      <form>
        <label htmlFor='severity'>Severity:</label>
        <select id='severity'>
          {drawSeverities}
        </select>
        <label htmlFor='status'>Status:</label>
        <select id='status'>
          {drawstatus}
        </select>
        <label htmlFor='appName'>App Name:</label>
        <select id='appName'>
          {drawApps}
        </select>
        

      </form>
    </>
  );
};

export default EditBugs;
