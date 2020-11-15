import React from 'react';
import { shallow } from 'enzyme';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const props = {
  component: jest.fn(),
  path: '',
};

describe.skip('PrivateRoute [ Route: utility ] component:', () => {
  it('renders without crashing', () => {
    shallow(<PrivateRoute {...props} />);
  });
});

describe.skip('PublicRoute [ Route: utility ] component:', () => {
  it('renders without crashing', () => {
    shallow(<PublicRoute {...props} />);
  });
});
