import React from 'react';
import { shallow } from 'enzyme';

import HomeRoute from './homeRoute';

describe('HomeRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<HomeRoute />);
  });
});
