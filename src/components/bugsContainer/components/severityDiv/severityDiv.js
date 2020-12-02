import React from 'react';

import { Bug } from '../';
import './severityDiv.scss';

const SeverityDiv = ({ bugs, severity, history }) => {
  return (
    <div id="severity-div" className={`severity-div ${severity}`}>
      <h4 className="welcome">{severity.replace('bugs', '')} Severity Bugs</h4>
      {bugs[severity].length ? (
        bugs[severity].map((bug) => (
          <Bug key={bug.id} bug={bug} history={history} />
        ))
      ) : (
          <p className="empty-message">No bugs!</p>
        )}
    </div>
  );
};

export default SeverityDiv;
