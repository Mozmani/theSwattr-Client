import React from 'react';
import { shallow } from 'enzyme';

import DashboardRoute from './dashboardRoute';

describe('DashboardRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<DashboardRoute />);
  });
});
