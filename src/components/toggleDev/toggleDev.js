import React from 'react';

import { UserService } from 'src/services';
import { UserContext } from 'src/context';

const ToggleDev = () => {
  const [error, setError] = React.useState('');

  const { userData, toggleDev } = React.useContext(UserContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { devSecret } = ev.target;
    const res = await UserService.toggleDev(devSecret.value);
    devSecret.value = '';

    if (res.error || res.message) {
      console.error(res);
      setError(res.error || res.message);
    } else toggleDev();
  };

  const devSecretField = (
    <label htmlFor="devSecret" className="dev-secret-label">
      <input
        type="password"
        id="devSecret"
        className="dev-secret-input"
      />
    </label>
  );

  return (
    <div className="dev-secret-container">
      <p>Current dev status: {userData.dev ? 'True' : 'False'}</p>
      {error}
      <form onSubmit={handleSubmit} className="dev-secret-form">
        {devSecretField}
        <footer>
          <button type="submit" className="dev-secret-submit">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ToggleDev;
