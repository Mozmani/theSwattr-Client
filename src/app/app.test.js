import React from 'react';
import { shallow } from 'enzyme';

import App from './app';

describe.skip('App component:', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
