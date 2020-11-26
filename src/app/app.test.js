import React from 'react';
import { shallow } from 'enzyme';

import App from './app';

describe('App component:', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
