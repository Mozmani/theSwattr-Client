import React from 'react';
import { shallow } from 'enzyme';

import { AdminRoute, PrivateRoute, PublicRoute } from '../';

const props = {
  component: jest.fn(),
  path: '',
  children: null,
};

describe('Route utility components:', () => {
  describe('AdminRoute [ Route utility ] component:', () => {
    it('renders without crashing', () => {
      shallow(<AdminRoute {...props} />);
    });
  });

  describe('PrivateRoute [ Route utility ] component:', () => {
    it('renders without crashing', () => {
      shallow(<PrivateRoute {...props} />);
    });
  });

  describe('PublicRoute [ Route utility ] component:', () => {
    it('renders without crashing', () => {
      shallow(<PublicRoute {...props} />);
    });
  });
});
