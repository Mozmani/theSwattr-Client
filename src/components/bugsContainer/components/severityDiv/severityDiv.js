import React from 'react';

import { Bug } from '../';

const SeverityDiv = ({ bugs, severity, history }) => {
  return (
    <div className={`severity-div ${severity}`}>
      <h4>{severity.replace('bugs', '')} Severity Bugs</h4>
      {bugs[severity].length ? (
        bugs[severity].map((bug) => (
          <Bug key={bug.id} bug={bug} history={history} />
        ))
      ) : (
        <p>No bugs!</p>
      )}
    </div>
  );
};

export default SeverityDiv;
