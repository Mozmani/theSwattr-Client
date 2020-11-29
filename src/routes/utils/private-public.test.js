import React from 'react';
import { shallow } from 'enzyme';

import { PrivateRoute, PublicRoute } from '../';

const props = {
  component: jest.fn(),
  path: '',
  children: null,
};

describe.skip('Route utility components:', () => {
  describe.skip('PrivateRoute [ Route utility ] component:', () => {
    it('renders without crashing', () => {
      shallow(<PrivateRoute {...props} />);
    });
  });

  describe.skip('PublicRoute [ Route utility ] component:', () => {
    it('renders without crashing', () => {
      shallow(<PublicRoute {...props} />);
    });
  });
});
