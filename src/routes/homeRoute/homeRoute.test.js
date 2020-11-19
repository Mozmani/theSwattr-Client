import React from 'react';
import { shallow } from 'enzyme';

import HomeRoute from './homeRoute';

describe.skip('HomeRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<HomeRoute />);
  });
});
