import React from 'react';

import { Bug } from '../';

const CompletedBugs = ({ bugs, severity, history }) => {
  return (
    <div className={`severity-div ${severity}`}>
      <h4>Completed/Closed Bugs</h4>
      {bugs[severity].length ? (
        bugs[severity].map((bug) => (
          <Bug key={bug.id} bug={bug} history={history} />
        ))
      ) : (
        <p>No Completed/Closed bugs!</p>
      )}
    </div>
  );
};

export default CompletedBugs;
